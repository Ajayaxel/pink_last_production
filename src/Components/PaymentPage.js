import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {BASE_URL} from '../api/apiService'; 


const PaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, totalAmount, cartItems = [], deliveryAddress } = location.state || {};
  
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // Build image URL helper - SAME AS CHECKOUT
  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    
    // If it's already a full URL, return as is
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    
    // If it's a relative path, build the full URL
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  // Generate random order ID - SAME AS CHECKOUT
  const generateOrderId = () => {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORD-${timestamp}-${randomNum}`;
  };

  // Calculate shipping - SAME AS CHECKOUT
  const calculateShipping = () => {
    // Add your shipping calculation logic here
    return totalAmount > 200 ? 0 : 25; // Free shipping over AED 200
  };

  // Create order function - EXACTLY SAME AS CHECKOUT
  const createOrder = async (deliveryAddress) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = calculateShipping();
    const tax = 0;
    const total = subtotal + shippingCost + tax;

    const token = localStorage.getItem('token'); // Assumes JWT stored here

    // Generate random order ID
    const orderId = generateOrderId();

    const orderPayload = {
      orderId: orderId,
      userId: userId,
      productDetails: cartItems.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      })),
      deliveryAddress: {
        fullName: deliveryAddress.fullName,
        phoneNumber: deliveryAddress.phoneNumber,
        addressLine1: deliveryAddress.addressLine1,
        addressLine2: deliveryAddress.addressLine2,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        postalCode: deliveryAddress.postalCode,
        country: deliveryAddress.country
      },
      total: total,
      status: 'pending', // Initial status - SAME AS CHECKOUT
      paymentStatus: 'pending' // SAME AS CHECKOUT
    };

    // Log the request data in JSON format
    console.log("📦 Order Payload being sent to backend:");
    console.log(JSON.stringify(orderPayload, null, 2)); // nicely formatted

    try {
      const response = await fetch(`${BASE_URL}orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // <-- Add this line
        },
        body: JSON.stringify(orderPayload)
      });
      

      const data = await response.json();
      
      console.log("🔍 Full backend response:", data); // Debug log
      
      if (response.ok && data.success) {
        // Handle different possible response formats - SAME AS CHECKOUT
        const orderData = data.order || data.data || data;
        console.log('✅ Order created successfully:', orderData);
        
        // Return the order data with fallback to payload data
        return orderData || { 
          ...orderPayload, 
          _id: data._id || orderId,
          createdAt: new Date().toISOString() 
        };
      } else {
        console.error('❌ Failed to create order:', data.message || 'Unknown error');
        throw new Error(data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('🔥 Error creating order:', error);
      throw error;
    }
  };

  // Update stock quantities - SAME AS CHECKOUT
  const updateStockQuantities = async () => {
    try {
      const stockUpdateResponse = await fetch(`${BASE_URL}products/update-quantity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });

      const stockUpdateData = await stockUpdateResponse.json();
      
      if (!stockUpdateResponse.ok) {
        console.error('⚠️ Stock update failed:', stockUpdateData.message);
        return false;
      } else {
        console.log('✅ Stock updated successfully');
        return true;
      }
    } catch (stockErr) {
      console.error('⚠️ Stock update failed:', stockErr);
      return false;
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;
  
    setLoading(true);
  
    try {
      // ✅ Convert AED to fils
      const amountInFils = Math.round(finalTotal * 100);
  
      const res = await fetch(`${BASE_URL}payment/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInFils }),
      });
  
      const { clientSecret } = await res.json();
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      if (result.error) {
        // Navigate to failure page
        navigate('/payment-failed', {
          state: {
            error: result.error,
            errorMessage: result.error.message,
            amount: finalTotal,
            userId,
            cartItems,
            deliveryAddress,
            paymentIntent: { id: 'failed', status: 'failed' },
          },
        });
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('🚀 Payment successful, creating order...');
  
        // Create order
        let order;
        try {
          order = await createOrder(deliveryAddress);
          console.log('📋 Order creation result:', order);
  
          if (!order) {
            throw new Error('Order creation returned empty result');
          }
        } catch (orderError) {
          console.error('❌ Order creation failed after payment:', orderError);
          navigate('/payment-failed', {
            state: {
              error: { message: `Failed to create order: ${orderError.message}` },
              errorMessage: `Failed to create order: ${orderError.message}`,
              amount: finalTotal,
              userId,
              cartItems,
              deliveryAddress,
              paymentIntent: result.paymentIntent,
            },
          });
          return;
        }
  
        // Update stock
        console.log('📦 Updating stock quantities...');
        const stockUpdateSuccess = await updateStockQuantities();
  
        if (!stockUpdateSuccess) {
          console.warn('⚠️ Stock update failed after payment');
        }
  
        // Navigate to success page
        navigate('/payment-success', {
          state: {
            paymentIntent: result.paymentIntent,
            amount: finalTotal,
            userId,
            cartItems,
            order,
            orderId: order?.orderId || order?._id,
            stockUpdateSuccess,
            deliveryAddress,
          },
        });
      }
    } catch (err) {
      console.error('🔥 Payment processing error:', err);
      navigate('/payment-failed', {
        state: {
          error: { message: 'An unexpected error occurred while processing your payment' },
          errorMessage: 'An unexpected error occurred while processing your payment',
          amount: finalTotal,
          userId,
          cartItems,
          deliveryAddress,
          paymentIntent: { id: 'error', status: 'error' },
        },
      });
    } finally {
      setLoading(false);
    }
  };
  

  // Calculate final totals - SAME AS CHECKOUT
  const shippingCost = calculateShipping();
  const finalTotal = totalAmount + shippingCost;

  // Redirect to home if no payment data
  if (!totalAmount || !userId) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment Details</h1>

      {/* Delivery Address */}
      {deliveryAddress && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{deliveryAddress.fullName}</p>
            <p className="text-gray-600">{deliveryAddress.addressLine1}</p>
            {deliveryAddress.addressLine2 && (
              <p className="text-gray-600">{deliveryAddress.addressLine2}</p>
            )}
            <p className="text-gray-600">
              {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.postalCode}
            </p>
            <p className="text-gray-600">{deliveryAddress.country}</p>
            <p className="text-gray-600">Phone: {deliveryAddress.phoneNumber}</p>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="mb-2"><span className="font-medium">User ID:</span> {userId}</p>
          <p className="mb-4"><span className="font-medium">Items:</span> {cartItems.length}</p>
          
          {cartItems.length > 0 && (
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                  <img
                    src={buildImageUrl(item.image)}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <div className="text-sm text-gray-600">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span className="ml-3">Color: {item.selectedColor}</span>}
                    </div>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">AED {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Price Breakdown - SAME AS CHECKOUT */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">AED {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'Free' : `AED ${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-green-600">AED {finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="my-6">
        <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
        <CardElement 
          className="border rounded-md p-4 bg-gray-50"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>

      <div className="mt-8 text-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Pay AED ${finalTotal.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
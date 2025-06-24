import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const PaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, totalAmount, cartItems = [], deliveryAddress } = location.state || {};
  console.log(deliveryAddress);
  console.log(totalAmount);
  
  

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // Create order after successful payment
  const createOrder = async (paymentIntentId) => {
    try {
      const response = await fetch('http://localhost:7000/api/orders/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          paymentIntentId,
          items: cartItems.map(item => ({
            productId: item.id || item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor
          })),
          totalAmount,
          deliveryAddress
        })
      });

      const data = await response.json();
      if (data.success) {
        console.log('Order created successfully:', data.order);
        return data.order;
      } else {
        console.error('Failed to create order:', data.message);
        return null;
      }
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const res = await fetch('https://backend.pinkstories.ae/api/payment/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        // Navigate to failure page with error details
        navigate('/payment-failed', {
          state: {
            error: result.error.message,
            amount: totalAmount,
            userId: userId,
            cartItems: cartItems
          }
        });
      } else if (result.paymentIntent.status === 'succeeded') {
        // Create order in the database
        const order = await createOrder(result.paymentIntent.id);
        
        // Update stock quantity on backend
        try {
          await fetch('http://localhost:7000/api/products/update-quantity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems }),
          });
        } catch (stockErr) {
          console.error('⚠️ Stock update failed:', stockErr);
          // You can optionally toast/log this without blocking user
        }
      
        // Navigate to success page with order details
        navigate('/payment-success', {
          state: {
            paymentIntent: result.paymentIntent,
            amount: totalAmount,
            userId: userId,
            cartItems: cartItems,
            order: order, // Include order details
            orderId: order?.orderId // Include order ID for easy access
          }
        });
      }
      
    } catch (err) {
      console.error(err);
      // Navigate to failure page with generic error
      navigate('/payment-failed', {
        state: {
          error: 'An unexpected error occurred while processing your payment',
          amount: totalAmount,
          userId: userId,
          cartItems: cartItems
        }
      });
    } finally {
      setLoading(false);
    }
  };

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
                    src={item.image}
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

      <div className="text-right mt-6">
        <h2 className="text-2xl font-bold text-green-600">Total: AED {totalAmount}</h2>
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
          {loading ? 'Processing...' : `Pay AED ${totalAmount}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
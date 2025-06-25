import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XCircle, Package, RefreshCw, Home, AlertTriangle } from 'lucide-react';
import { useState } from 'react';


const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = useState(false);

  
  // Get the actual data passed from PaymentDetails component
  const { 
    paymentIntent, 
    amount, 
    userId, 
    cartItems = [], 
    error,
    errorMessage,
    deliveryAddress 
  } = location.state || {};

  // Redirect to home if no payment data
  if (!amount || !userId) {
    navigate('/');
    return null;
  }

  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  const handleRetryPayment = () => {
    setIsRetrying(true);
    // Navigate back to payment page with the same data
    navigate('/payment-details', {
      state: {
        userId,
        totalAmount: amount,
        cartItems
      }
    });
  };

  const handleContinueShopping = () => {
    // Navigate to home page
    navigate('/');
  };

  const handleContactSupport = () => {
    // Navigate to contact/support page or open email client
    window.location.href = 'mailto:support@pinkstories.ae?subject=Payment Failed - Need Assistance';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Failed Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-xl text-gray-600">We couldn't process your payment</p>
        </div>

        {/* Payment Failure Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Payment Unsuccessful</h2>
                <p className="text-gray-600 mt-1">Transaction ID: {paymentIntent?.id || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-1">Customer ID: {userId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-3xl font-bold text-red-600">AED {parseFloat(amount).toFixed(2)}</p>
                <p className="text-sm text-red-500">Not charged</p>
              </div>
            </div>
          </div>

          {/* Error Information */}
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800 mb-2">What went wrong?</h4>
                <p className="text-sm text-red-700">
                  {errorMessage || error?.message || 'Your payment could not be processed. This could be due to insufficient funds, card issues, or network problems.'}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Address - Enhanced Display */}
          {deliveryAddress ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-600" />
                Delivery Address (Saved)
              </h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{deliveryAddress.fullName}</p>
                    <div className="text-gray-700 mt-2 space-y-1">
                      <p>{deliveryAddress.addressLine1}</p>
                      {deliveryAddress.addressLine2 && (
                        <p>{deliveryAddress.addressLine2}</p>
                      )}
                      <p>
                        {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.postalCode}
                      </p>
                      <p className="font-medium">{deliveryAddress.country}</p>
                    </div>
                  </div>
                  <div className="text-gray-700">
                    <p className="font-medium">Contact Information:</p>
                    <p className="mt-1">📞 {deliveryAddress.phoneNumber}</p>
                    {deliveryAddress.email && (
                      <p className="mt-1">📧 {deliveryAddress.email}</p>
                    )}
                  </div>
                </div>
                <div className="mt-3 p-2 bg-orange-100 rounded text-sm text-orange-800">
                  ✅ Your delivery address is saved and will be used when you retry payment
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-400" />
                Delivery Address
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-500 italic">No delivery address provided</p>
              </div>
            </div>
          )}

          {/* Cart Items (Still Available) */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Items in Your Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
            </h3>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={buildImageUrl(item.image)}
                    alt={item.name || 'Product'}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900">{item.name || 'Product'}</h4>
                    <div className="text-sm text-gray-600">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span className="ml-3">Color: {item.selectedColor}</span>}
                    </div>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      AED {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">AED {(item.price || 0).toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-orange-800 mb-2">Transaction Details</h4>
            <div className="text-sm text-orange-700 space-y-1">
              <p><span className="font-medium">Payment ID:</span> {paymentIntent?.id || 'N/A'}</p>
              <p><span className="font-medium">Status:</span> {paymentIntent?.status || 'Failed'}</p>
              <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
              <p><span className="font-medium">Amount:</span> AED {parseFloat(amount).toFixed(2)} (Not charged)</p>
            </div>
          </div>

          {/* What to do next */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">What can you do?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Check your card details and try again</li>
              <li>• Ensure you have sufficient funds</li>
              <li>• Try using a different payment method</li>
              <li>• Contact your bank if the issue persists</li>
              <li>• Reach out to our support team for assistance</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetryPayment}
            className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-700 transition shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={handleContactSupport}
            className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-orange-700 transition shadow-lg"
          >
            <AlertTriangle className="w-5 h-5" />
            Contact Support
          </button>
          <button
            onClick={handleContinueShopping}
            className="inline-flex items-center justify-center gap-2 bg-gray-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-700 transition shadow-lg"
          >
            <Home className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>

        {/* Additional Information */}
        <div className="text-center mt-8 text-gray-600">
          <p className="mb-2">Having trouble with your payment?</p>
          <p>Contact us at <a href="mailto:support@pinkstories.ae" className="text-red-600 hover:underline">support@pinkstories.ae</a></p>
          <p>or call <a href="tel:+971-xxx-xxxx" className="text-red-600 hover:underline">+971-xxx-xxxx</a></p>
          <p className="text-sm mt-4 text-gray-500">Your cart items are still saved and ready for checkout</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
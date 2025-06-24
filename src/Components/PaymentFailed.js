import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = useState(false);
  
  const { error, amount, userId, cartItems = [] } = location.state || {};

  // Redirect to home if no error data
  if (!error || !amount) {
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

  const getErrorMessage = (errorText) => {
    // Common error messages and their user-friendly versions
    const errorMap = {
      'card_declined': 'Your card was declined. Please try a different payment method.',
      'insufficient_funds': 'Insufficient funds. Please use a different card or payment method.',
      'expired_card': 'Your card has expired. Please use a different card.',
      'incorrect_cvc': 'The security code is incorrect. Please check and try again.',
      'processing_error': 'There was an error processing your payment. Please try again.',
      'network_error': 'Network connection issue. Please check your internet and try again.'
    };

    // Check if the error contains any known error types
    for (const [key, message] of Object.entries(errorMap)) {
      if (errorText.toLowerCase().includes(key.replace('_', ' '))) {
        return message;
      }
    }

    // Return original error if no match found
    return errorText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Error Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 text-center">
          <div className="mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-2">Payment Failed</h1>
            <p className="text-xl opacity-90">Don't worry, your order is still saved</p>
          </div>
        </div>

        {/* Error Details */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Error Information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What Happened?</h2>
              
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Payment Error</h3>
                    <p className="text-red-700">{getErrorMessage(error)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Common Solutions:</h3>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• Check your card details and try again</li>
                  <li>• Ensure you have sufficient funds</li>
                  <li>• Try a different payment method</li>
                  <li>• Contact your bank if the issue persists</li>
                  <li>• Check your internet connection</li>
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Order</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-3 flex justify-between">
                  <span className="font-medium text-gray-600">Customer ID:</span>
                  <span>{userId}</span>
                </div>
                
                <div className="mb-3 flex justify-between">
                  <span className="font-medium text-gray-600">Total Amount:</span>
                  <span className="font-bold text-lg">AED {amount}</span>
                </div>
                
                <div className="mb-3 flex justify-between">
                  <span className="font-medium text-gray-600">Items:</span>
                  <span>{cartItems.length} item(s)</span>
                </div>

                {cartItems.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-gray-700">Items in Cart:</h4>
                    <div className="max-h-40 overflow-y-auto">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded">
                          <img
                            src={buildImageUrl(item.image)}
                            alt={item.name || 'Product'}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name || 'Product'}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                          </div>
                          <p className="text-sm font-medium">AED {item.price || 0}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-800 mb-3">Need Help?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-yellow-700">
              <div>
                <h4 className="font-semibold mb-2">Contact Support</h4>
                <p className="text-sm">Email: support@pinkstories.ae</p>
                <p className="text-sm">Phone: +971 XXX XXXX</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <p className="text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-sm">Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetryPayment}
                disabled={isRetrying}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isRetrying ? 'Redirecting...' : 'Try Again'}
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="bg-white border-2 border-gray-400 text-gray-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Continue Shopping
              </button>
              
              <button
                onClick={() => navigate('/cart')}
                className="bg-white border-2 border-green-500 text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300"
              >
                View Cart
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              Your cart items are saved and ready when you're ready to try again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
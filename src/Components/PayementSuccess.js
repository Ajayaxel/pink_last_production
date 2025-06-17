import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  
  const { paymentIntent, amount, userId, cartItems = [] } = location.state || {};

  useEffect(() => {
    // Auto redirect to home after 10 seconds
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Redirect to home if no payment data
  if (!paymentIntent || !amount) {
    navigate('/');
    return null;
  }

  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
          <div className="mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-xl opacity-90">Thank you for your purchase</p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Transaction Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction Details</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-sm">{paymentIntent.id}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Amount Paid:</span>
                  <span className="font-bold text-green-600 text-lg">AED {amount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Payment Method:</span>
                  <span>Card ending in ****</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Status:</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completed
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-3">
                  <span className="font-medium text-gray-600">Customer ID:</span>
                  <span className="ml-2">{userId}</span>
                </div>
                
                <div className="mb-3">
                  <span className="font-medium text-gray-600">Items Purchased:</span>
                  <span className="ml-2">{cartItems.length} item(s)</span>
                </div>

                {cartItems.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-gray-700">Items:</h4>
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
                )}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-bold text-blue-800 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                You'll receive a confirmation email shortly
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Your order will be processed within 24 hours
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Track your order in your account dashboard
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Continue Shopping
              </button>
              
              <button
                onClick={() => navigate('/orders')}
                className="bg-white border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                View Orders
              </button>
            </div>
            
            <p className="text-gray-500 text-sm">
              Redirecting to homepage in {countdown} seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
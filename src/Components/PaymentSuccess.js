import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Eye, Home, MapPin } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the actual data passed from PaymentDetails component
  const { 
    paymentIntent, 
    amount, 
    userId, 
    cartItems = [], 
    order, 
    orderId, 
    stockUpdateSuccess,
    deliveryAddress 
  } = location.state || {};

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

  const handleViewOrders = () => {
    // Navigate to orders page
    navigate('/orders');
  };

  const handleContinueShopping = () => {
    // Navigate to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Order Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Order Confirmed</h2>
                <p className="text-gray-600 mt-1">Order #{orderId || order?.orderId || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-1">Customer ID: {userId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-3xl font-bold text-green-600">AED {parseFloat(amount).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address - Enhanced Display */}
          {deliveryAddress ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Delivery Address
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                Delivery Address
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-500 italic">No delivery address provided</p>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Items ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
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
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-green-800 mb-2">Payment Information</h4>
            <div className="text-sm text-green-700 space-y-1">
              <p><span className="font-medium">Payment ID:</span> {paymentIntent.id}</p>
              <p><span className="font-medium">Status:</span> {paymentIntent.status}</p>
              <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
              {stockUpdateSuccess !== undefined && (
                <p><span className="font-medium">Inventory Status:</span> 
                  <span className={stockUpdateSuccess ? 'text-green-600' : 'text-yellow-600'}>
                    {stockUpdateSuccess ? ' ✅ Updated' : ' ⚠️ Pending Update'}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• You'll receive an order confirmation email shortly</li>
              <li>• We'll notify you when your order ships</li>
              <li>• Track your order anytime in the Orders section</li>
              <li>• Estimated delivery: 3-5 business days</li>
              {deliveryAddress && (
                <li>• Your order will be delivered to {deliveryAddress.city}, {deliveryAddress.state}</li>
              )}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleViewOrders}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition shadow-lg"
          >
            <Eye className="w-5 h-5" />
            View My Orders
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
          <p className="mb-2">Need help with your order?</p>
          <p>Contact us at <a href="mailto:support@pinkstories.ae" className="text-blue-600 hover:underline">support@pinkstories.ae</a></p>
          <p>or call <a href="tel:+971-xxx-xxxx" className="text-blue-600 hover:underline">+971-xxx-xxxx</a></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
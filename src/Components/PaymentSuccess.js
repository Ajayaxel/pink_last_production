import React from 'react';
import { CheckCircle, Package, Eye, Home } from 'lucide-react';

const PaymentSuccess = () => {
  // In a real app, you'd get this from props, location state, or context
  const mockOrderData = {
    orderId: 'ORD-123456ABCDE',
    amount: 299.99,
    userId: 'user123',
    paymentIntent: {
      id: 'pi_1234567890',
      status: 'succeeded'
    },
    cartItems: [
      {
        id: '1',
        name: 'Premium Cotton T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        price: 99.99,
        quantity: 2,
        selectedSize: 'M',
        selectedColor: 'Blue'
      },
      {
        id: '2',
        name: 'Designer Jeans',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop',
        price: 199.99,
        quantity: 1,
        selectedSize: '32',
        selectedColor: 'Dark Blue'
      }
    ]
  };

  const handleViewOrders = () => {
    // In a real app, this would navigate to the orders page
    window.location.href = '/orders';
  };

  const handleContinueShopping = () => {
    // In a real app, this would navigate to the home page
    window.location.href = '/';
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
                <p className="text-gray-600 mt-1">Order #{mockOrderData.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-3xl font-bold text-green-600">AED {mockOrderData.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Items
            </h3>
            <div className="space-y-4">
              {mockOrderData.cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
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
                    <p className="font-medium text-gray-900">AED {(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">AED {item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-green-800 mb-2">Payment Information</h4>
            <div className="text-sm text-green-700 space-y-1">
              <p><span className="font-medium">Payment ID:</span> {mockOrderData.paymentIntent.id}</p>
              <p><span className="font-medium">Status:</span> {mockOrderData.paymentIntent.status}</p>
              <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
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
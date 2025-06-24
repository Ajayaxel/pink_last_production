import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const statusColors = {
    processing: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    returned: 'bg-gray-100 text-gray-800'
  };

  const paymentStatusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-purple-100 text-purple-800'
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:7000/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setOrder(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch order details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      const response = await fetch(`http://localhost:7000/api/orders/${id}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        alert('Order cancelled successfully');
        fetchOrderDetails();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to cancel order');
      console.error(err);
    }
  };

  const handleRequestReturn = async () => {
    const reason = prompt('Please provide a reason for return:');
    if (!reason) return;

    try {
      const response = await fetch(`http://localhost:7000/api/orders/${id}/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ reason })
      });

      const data = await response.json();

      if (data.success) {
        alert('Return request submitted successfully');
        fetchOrderDetails();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to submit return request');
      console.error(err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900">Order not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2"
          >
            ← Back to Orders
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Order #{order.orderNumber}
          </h1>
          <p className="text-gray-600">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <div className="flex gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${paymentStatusColors[order.paymentStatus]}`}>
              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${item.product._id}-${item.size}-${item.color}`} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                  <img
                    src={item.product.images?.[0] || '/placeholder-image.jpg'}
                    alt={item.product.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900">
                      {item.product.productName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      SKU: {item.product.sku}
                    </p>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span className="ml-3">Color: {item.color}</span>}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      AED {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      AED {item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="text-gray-700">
              <p className="font-medium">{order.user.firstName} {order.user.lastName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              {order.shippingAddress.phoneNumber && (
                <p className="mt-2">Phone: {order.shippingAddress.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium capitalize">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${paymentStatusColors[order.paymentStatus]}`}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
              </div>
              {order.paymentId && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Payment ID</p>
                  <p className="font-medium font-mono text-sm">{order.paymentId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tracking Information */}
          {order.trackingNumber && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Tracking Information</h2>
              <div>
                <p className="text-sm text-gray-600">Tracking Number</p>
                <p className="font-medium font-mono">{order.trackingNumber}</p>
              </div>
              {order.shippingMethod && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600">Shipping Method</p>
                  <p className="font-medium">{order.shippingMethod}</p>
                </div>
              )}
            </div>
          )}

          {/* Return Request */}
          {order.returnRequest && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Return Request</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium capitalize">{order.returnRequest.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reason</p>
                  <p className="font-medium">{order.returnRequest.reason}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Requested Date</p>
                  <p className="font-medium">{formatDate(order.returnRequest.requestDate)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Notes */}
          {order.notes && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Notes</h2>
              <p className="text-gray-700">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">AED {order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">AED {order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">AED {order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-green-600">
                    AED {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="space-y-3">
              {order.status === 'processing' && (
                <button
                  onClick={handleCancelOrder}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  Cancel Order
                </button>
              )}
              
              {order.status === 'delivered' && !order.returnRequest && (
                <button
                  onClick={handleRequestReturn}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
                >
                  Request Return
                </button>
              )}
              
              <button
                onClick={() => window.print()}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Print Order
              </button>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-sm text-blue-800 mb-3">
              Have questions about your order? Our support team is here to help.
            </p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
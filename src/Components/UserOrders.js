import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Calendar, DollarSign, Eye, Truck, Clock, CheckCircle, XCircle } from 'lucide-react';
import {BASE_URL} from '../api/apiService'; 


const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Mock userId - replace with actual user ID from your auth system
  const userId = "68472074f790d13ca3d4c5d3";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}orders/user/${userId}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Handle both single order and array of orders
        const ordersArray = Array.isArray(data.data) ? data.data : [data.data];
        setOrders(ordersArray);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Clock size={16} />;
      case 'processing':
        return <Package size={16} />;
      case 'shipped':
        return <Truck size={16} />;
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading orders...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order History</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError('')}
              className="text-red-600 hover:text-red-800 text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h2>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.orderId}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package size={16} />
                        <span>{order.productDetails?.length || 0} item(s)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} />
                        <span className="font-semibold text-gray-900">AED {order.total?.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* First product preview */}
                    {order.productDetails && order.productDetails.length > 0 && (
                      <div className="mt-3 flex items-center gap-3">
                        <img
                          src={buildImageUrl(order.productDetails[0].image)}
                          alt={order.productDetails[0].name}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {order.productDetails[0].name}
                          </p>
                          {order.productDetails.length > 1 && (
                            <p className="text-xs text-gray-500">
                              +{order.productDetails.length - 1} more item(s)
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Order Info */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-semibold">{selectedOrder.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-semibold">{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status?.charAt(0).toUpperCase() + selectedOrder.status?.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.paymentStatus)}`}>
                        {selectedOrder.paymentStatus?.charAt(0).toUpperCase() + selectedOrder.paymentStatus?.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
                  <div className="space-y-4">
                    {selectedOrder.productDetails?.map((product, index) => (
                      <div key={index} className="flex gap-4 p-4 border rounded-lg">
                        <img
                          src={buildImageUrl(product.image)}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            {product.selectedSize && <div>Size: {product.selectedSize}</div>}
                            {product.selectedColor && <div>Color: {product.selectedColor}</div>}
                            <div>Quantity: {product.quantity}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">AED {(product.price * product.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">AED {product.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">{selectedOrder.deliveryAddress?.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedOrder.deliveryAddress?.addressLine1}
                      {selectedOrder.deliveryAddress?.addressLine2 && `, ${selectedOrder.deliveryAddress.addressLine2}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.deliveryAddress?.city}, {selectedOrder.deliveryAddress?.state} {selectedOrder.deliveryAddress?.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{selectedOrder.deliveryAddress?.country}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Phone: {selectedOrder.deliveryAddress?.phoneNumber}
                    </p>
                  </div>
                </div>

                {/* Order Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-xl font-bold text-pink-600">
                      AED {selectedOrder.total?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
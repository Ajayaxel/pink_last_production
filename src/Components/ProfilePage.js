import React, { useState, useEffect } from 'react';
import { Bell, Edit, Mail, Settings, LogOut, ShoppingBag, User, Package, Calendar, DollarSign, Eye, Truck, Clock, CheckCircle, XCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import {BASE_URL} from '../api/apiService';

const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Profile', icon: <User size={20} />, page: 'profile' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, page: 'orders' },
    { name: 'Settings', icon: <Settings size={20} />, page: 'settings' },
    { name: 'Logout', icon: <LogOut size={20} />, page: 'logout' },
  ];

  const handleItemClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 left-0 h-full z-50 lg:z-auto
        w-72 sm:w-80 lg:w-72 
        border rounded-none lg:rounded-lg 
        bg-white bg-opacity-60 backdrop-blur-md shadow-lg 
        p-4 sm:p-6 flex flex-col items-center
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 lg:hidden p-2 rounded-lg hover:bg-gray-200"
        >
          <X size={20} />
        </button>

        <div className="mb-8 lg:mb-10 mt-8 lg:mt-0">
          <h1 className="text-xl sm:text-2xl font-bold text-[#222222]">Profile</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your account</p>
        </div>

        <ul className="space-y-3 sm:space-y-4 w-full">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleItemClick(item.page)}
                className={`w-full h-11 sm:h-12 flex items-center px-4 sm:px-5 rounded-xl transition-all duration-300 ${
                  currentPage === item.page 
                    ? 'bg-[#111827] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="mr-3 sm:mr-4">
                  {React.cloneElement(item.icon, { size: 20, color: currentPage === item.page ? "#fff" : "#555" })}
                </div>
                <span className="font-medium text-sm sm:text-base">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

/// profile page 
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const parseUserData = () => {
      try {
        const storedUserData = localStorage.getItem('userData');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else if (userEmail) {
          setUserData({
            emailId: userEmail,
            role: userRole || 'user',
            id: userId,
            name: userEmail.split('@')[0],
            loginTime: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      } finally {
        setLoading(false);
      }
    };
    parseUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-md max-w-md w-full">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">No User Data Found</h2>
          <p className="text-gray-500 mb-6">Please log in to view your profile.</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <Navbar />
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="fixed top-20 left-4 z-30 lg:hidden p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
      >
        <Menu size={20} />
      </button>

      <div className="flex pt-16 lg:pt-16" style={{ height: 'calc(100vh - 64px)' }}>
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={(page) => {
            if (page === 'logout') setShowLogoutModal(true);
            else setCurrentPage(page);
          }}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 h-full overflow-auto">
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden h-full p-4 sm:p-6 lg:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentPage === 'profile' && (
              <ProfileContent userData={userData} />
            )}
            {currentPage === 'orders' && (
              <OrdersContent userData={userData} />
            )}
            {currentPage === 'settings' && (
              <div className="text-lg sm:text-xl text-gray-500">Settings Page (coming soon)</div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showLogoutModal && (
          <motion.div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <LogOut className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Logout</h3>
                <p className="text-gray-500 mb-6">Are you sure you want to logout of your account?</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setShowLogoutModal(false)} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleLogout} className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/// profile content 
const ProfileContent = ({ userData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getInitials = (name, email) => {
    if (name && name !== email?.split('@')[0]) {
      return name.split(' ').map((n) => n[0]).join('').toUpperCase();
    }
    return email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <>
      <div className="relative w-full">
        <img 
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png" 
          alt="" 
          className="w-full h-32 sm:h-48 lg:h-auto object-cover object-center"
        />
        <div className="absolute -bottom-8 sm:-bottom-12 lg:-bottom-16 left-4 sm:left-6 lg:left-8">
          <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-2 sm:border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-lg sm:text-2xl lg:text-4xl font-bold shadow-lg">
            {getInitials(userData.name, userData.emailId)}
          </div>
        </div>
      </div>

      <div className="pt-12 sm:pt-16 lg:pt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{userData.name || userData.emailId?.split('@')[0]}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <InfoCard icon={<User size={18} />} label="User ID" value={userData.id || 'N/A'} />
          <InfoCard icon={<Mail size={18} />} label="Email Address" value={userData.emailId} />
          <InfoCard icon={<Settings size={18} />} label="Account Role" value={userData.role || 'User'} capitalize />
          <InfoCard icon={<Bell size={18} />} label="Last Login" value={formatDate(userData.loginTime)} />
        </div>
      </div>
    </>
  );
};

/// orders content with dynamic data
const OrdersContent = ({ userData }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Get userId from userData or localStorage
  const userId = userData?.id || localStorage.getItem('userId') || "68472074f790d13ca3d4c5d3";

  useEffect(() => {
    fetchOrders();
  }, [userId]);

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
      day: 'numeric'
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

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productDetails?.some(product => 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">My Orders</h2>
      
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-0">
        <input
          type="text"
          placeholder="Search your orders here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 border rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 sm:px-5 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-blue-700 flex items-center justify-center transition-colors">
          🔍 Search Orders
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 sm:mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
            {searchTerm ? 'No orders found' : 'No orders yet'}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try searching with different keywords' : 'You haven\'t placed any orders yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg border shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  {/* First product image */}
                  {order.productDetails && order.productDetails.length > 0 && (
                    <div className="w-16 h-16 sm:w-16 sm:h-16 flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={buildImageUrl(order.productDetails[0].image)}
                        alt={order.productDetails[0].name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        Order #{order.orderId}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-1 ${getStatusColor(order.status)} mx-auto sm:mx-0 w-fit`}>
                        {getStatusIcon(order.status)}
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </span>
                    </div>
                    
                    {/* Product details */}
                    {order.productDetails && order.productDetails.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1 text-sm sm:text-base">
                          {order.productDetails[0].name}
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                            {order.productDetails[0].selectedColor && (
                              <span>Color: {order.productDetails[0].selectedColor}</span>
                            )}
                            {order.productDetails[0].selectedSize && (
                              <span>Size: {order.productDetails[0].selectedSize}</span>
                            )}
                          </div>
                          {order.productDetails.length > 1 && (
                            <span className="text-center sm:text-left">+{order.productDetails.length - 1} more item(s)</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mt-2">
                      <div className="flex items-center justify-center sm:justify-start gap-1">
                        <Calendar size={14} />
                        <span>Ordered: {formatDate(order.createdAt)}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-1">
                        <DollarSign size={14} />
                        <span className="font-semibold text-gray-900">AED {order.total?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center sm:justify-end gap-3">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium"
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
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl p-1"
                >
                  ×
                </button>
              </div>

              {/* Order Info */}
              <div className="mb-4 sm:mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-semibold text-sm sm:text-base">{selectedOrder.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold text-sm sm:text-base">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status?.charAt(0).toUpperCase() + selectedOrder.status?.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus?.charAt(0).toUpperCase() + selectedOrder.paymentStatus?.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Products</h3>
                <div className="space-y-3 sm:space-y-4">
                  {selectedOrder.productDetails?.map((product, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                      <img
                        src={buildImageUrl(product.image)}
                        alt={product.name}
                        className="w-16 h-16 sm:w-16 sm:h-16 object-cover rounded-lg mx-auto sm:mx-0"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-medium text-gray-900 text-sm sm:text-base">{product.name}</h4>
                        <div className="text-xs sm:text-sm text-gray-600 space-y-1 mt-1">
                          {product.selectedSize && <div>Size: {product.selectedSize}</div>}
                          {product.selectedColor && <div>Color: {product.selectedColor}</div>}
                          <div>Quantity: {product.quantity}</div>
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="font-semibold text-sm sm:text-base">AED {(product.price * product.quantity).toFixed(2)}</p>
                        <p className="text-xs sm:text-sm text-gray-600">AED {product.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              {selectedOrder.deliveryAddress && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Delivery Address</h3>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p className="font-medium text-sm sm:text-base">{selectedOrder.deliveryAddress?.fullName}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {selectedOrder.deliveryAddress?.addressLine1}
                      {selectedOrder.deliveryAddress?.addressLine2 && `, ${selectedOrder.deliveryAddress.addressLine2}`}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {selectedOrder.deliveryAddress?.city}, {selectedOrder.deliveryAddress?.state} {selectedOrder.deliveryAddress?.postalCode}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">{selectedOrder.deliveryAddress?.country}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Phone: {selectedOrder.deliveryAddress?.phoneNumber}
                    </p>
                  </div>
                </div>
              )}

              {/* Order Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold">Total Amount</span>
                  <span className="text-lg sm:text-xl font-bold text-blue-600">
                    AED {selectedOrder.total?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const InfoCard = ({ icon, label, value, capitalize }) => (
  <div className="bg-[#f9fafb] p-3 sm:p-4 rounded-xl border border-gray-200">
    <div className="flex items-center mb-2">
      <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-2 sm:mr-3">{icon}</div>
      <span className="text-xs sm:text-sm font-medium text-gray-500">{label}</span>
    </div>
    <p className={`text-gray-800 font-medium pl-8 sm:pl-11 text-sm sm:text-base ${capitalize ? 'capitalize' : ''}`}>
      {value}
    </p>
  </div>
);

export default ProfilePage;
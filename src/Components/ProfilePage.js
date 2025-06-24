



import React, { useState, useEffect } from 'react';
import { Bell, Edit, Mail, Settings, LogOut, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { name: 'Profile', icon: <User size={20} />, page: 'profile' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, page: 'orders' },
    { name: 'Settings', icon: <Settings size={20} />, page: 'settings' },
    { name: 'Logout', icon: <LogOut size={20} />, page: 'logout' },
  ];

  return (
    <div className="w-72 border rounded-lg h-full bg-white bg-opacity-60 backdrop-blur-md shadow-lg p-6 flex flex-col items-center">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#222222]">Profile</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your account</p>
      </div>

      <ul className="space-y-4 w-full">
        {navItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => setCurrentPage(item.page)}
              className={`w-full h-12 flex items-center px-5 rounded-xl transition-all duration-300 ${
                currentPage === item.page 
                  ? 'bg-[#111827] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="mr-4">
                {React.cloneElement(item.icon, { size: 20, color: currentPage === item.page ? "#fff" : "#555" })}
              </div>
              <span className="font-medium">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


/// proifle page 
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No User Data Found</h2>
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
      <div className="flex pt-16" style={{ height: 'calc(100vh - 60px)' }}>
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={(page) => {
            if (page === 'logout') setShowLogoutModal(true);
            else setCurrentPage(page);
          }} 
        />

        <div className="flex-1 p-8 h-full overflow-auto">
          <motion.div
            className="bg-white rounded-2xl shadow-md overflow-hidden h-full p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentPage === 'profile' && (
              <ProfileContent userData={userData} />
            )}
            {currentPage === 'orders' && (
              <OrdersContent />
            )}
            {currentPage === 'settings' && (
              <div className="text-xl text-gray-500">Settings Page (coming soon)</div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showLogoutModal && (
          <motion.div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
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
          className="w-full object-cover object-center"
        />
        <div className="absolute -bottom-16 left-8">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {getInitials(userData.name, userData.emailId)}
          </div>
        </div>
      </div>

      <div className="pt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{userData.name || userData.emailId?.split('@')[0]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard icon={<User size={18} />} label="User ID" value={userData.id || 'N/A'} />
          <InfoCard icon={<Mail size={18} />} label="Email Address" value={userData.emailId} />
          <InfoCard icon={<Settings size={18} />} label="Account Role" value={userData.role || 'User'} capitalize />
          <InfoCard icon={<Bell size={18} />} label="Last Login" value={formatDate(userData.loginTime)} />
        </div>
      </div>
    </>
  );
};


/// orders content 
const OrdersContent = () => {
  const orders = [
    {
      id: 'ORD001',
      product: 'Kurtha Sree Cotton Printed Women\'s Dress',
      price: '₹1,299',
      image: 'https://www.neerus.com/cdn/shop/products/46972019-416peacock_4.jpg?v=1657334549',
      color: 'Blue',
      size: 'M',
      deliveryDate: 'Dec 22, 2024'
    },
    {
      id: 'ORD002',
      product: 'Kurtha Sree Silk Embroidered Anarkali Dress',
      price: '₹2,499',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdE2WRriUAYXg_XsSoXkMoYsN0uyrIaOiCTw&s',
      color: 'Red',
      size: 'L',
      deliveryDate: 'Dec 05, 2024'
    },
    {
      id: 'ORD003',
      product: 'Kurtha Sree Linen Casual Summer Dress',
      price: '₹1,799',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7owmLgp0y3n0OuCYiZ8820OD_T30klj7g0g&s',
      color: 'Green',
      size: 'S',
      deliveryDate: 'Dec 05, 2024'
    },
    {
      id: 'ORD004',
      product: 'Kurtha Sree Party Wear Sequinned Gown',
      price: '₹3,299',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThwpwrh32fWE17Cf6GOPUZLQLrPgj1l0Zhz-mcmry7k2rWMGnXjIVpVb2ajs_x0isHC_4&usqp=CAU',
      color: 'Black',
      size: 'XL',
      deliveryDate: 'Dec 09, 2024'
    },

  ];

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">My Orders</h2>
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search your orders here"
          className="flex-1 p-3 border rounded-l-lg bg-white focus:outline-none"
        />
        <button className="bg-blue-600 text-white px-5 rounded-r-lg hover:bg-blue-700 flex items-center">
          🔍 Search Orders
        </button>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="flex bg-white rounded-lg border shadow-sm p-4">
            <div className="w-24 h-24 flex-shrink-0">
              <img src={order.image} alt={order.product} className="w-full h-full object-contain rounded-md" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-gray-800 truncate">{order.product}</h3>
              {order.color && (
                <p className="text-sm text-gray-500">
                  Color: {order.color} {order.size && `Size: ${order.size}`}
                </p>
              )}
              <p className="text-lg font-semibold mt-1">{order.price}</p>
            </div>
            <div className="flex flex-col justify-center items-end">
              <div className="flex items-center mb-1">
                <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                <p className="text-sm text-gray-700 font-medium">Delivered on {order.deliveryDate}</p>
              </div>
              <p className="text-xs text-gray-500 mb-1">Your item has been delivered</p>
              <button className="text-blue-600 text-sm font-semibold hover:underline">
                ⭐ Rate & Review Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const InfoCard = ({ icon, label, value, capitalize }) => (
  <div className="bg-[#f9fafb] p-4 rounded-xl border border-gray-200">
    <div className="flex items-center mb-2">
      <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">{icon}</div>
      <span className="text-sm font-medium text-gray-500">{label}</span>
    </div>
    <p className={`text-gray-800 font-medium pl-11 ${capitalize ? 'capitalize' : ''}`}>
      {value}
    </p>
  </div>
);

export default ProfilePage;


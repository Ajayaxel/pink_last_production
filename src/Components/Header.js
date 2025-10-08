import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiBookmark } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ cart, setIsCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to get page name based on current route
  const getPageName = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'HOME';
      case '/shop':
        return 'SHOP';
      case '/best-seller':
        return 'BESTSELLERS';
      case '/party-wears':
        return 'PARTY WEARS';
      case '/semi-party-wears':
        return 'SEMI-PARTY WEARS';
      case '/co-ord-sets':
        return 'CO-ORD SETS';
      case '/indo-western-outfits':
        return 'INDO-WESTERN OUTFITS';
      case '/exclusive-collection':
        return 'CASUALS';
      case '/cart':
        return 'CART';
      case '/profile':
        return 'PROFILE';
      case '/orders':
        return 'ORDERS';
      case '/login':
        return 'LOGIN';
      default:
        return 'HOME';
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="w-full h-[70px] bg-white px-[20px] md:px-[50px] relative z-50 overflow-visible">
      <div className="flex justify-between items-center py-3">
        {/* Left Section - Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-black text-sm font-medium">
          <div className="relative group">
            <Link to="/shop" className="text-black">SHOP</Link>
          </div>

          <div className="relative group">
            <Link to="/best-seller" className="text-black">BESTSELLERS</Link>
          </div>

          <div className="relative group">
            <Link to="/exclusive-collection" className="text-black">CASUALS</Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle - Left Side */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-black text-2xl">
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Center Logo (Desktop) / Page Name (Mobile) */}
        <div className="flex-1 flex justify-center">
          {/* Desktop Logo */}
          <button onClick={() => navigate("/")} className="hidden md:flex text-xl font-bold text-[#c49a6c] items-center">
            <img src="/New logo her pride gold black  1.png" alt="Logo" className="h-8 w-auto" />
          </button>
          
          {/* Mobile Page Name */}
          <div className="md:hidden flex items-center">
            <h1 className="text-lg font-semibold text-[#c49a6c] tracking-wide">
              {getPageName()}
            </h1>
          </div>
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-5 text-black text-lg relative">
          <FiBookmark className="cursor-pointer hover:text-[#c49a6c] transition-colors duration-200" />
          <h3 onClick={() => navigate('/cart')} className="cursor-pointer text-sm font-medium hover:text-[#c49a6c] transition-colors duration-200">CART</h3>

          {isAuthenticated ? (
            <div className="relative group cursor-pointer">
              <FaUserCircle className="text-2xl text-black hover:text-[#c49a6c] transition-colors duration-200" />
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-700">Orders</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-700">Logout</button>
              </div>
            </div>
          ) : (
            <h3 className="cursor-pointer text-sm font-medium">
              <Link to="/login" className="text-black hover:text-[#c49a6c] transition-colors duration-200">LOGIN</Link>
            </h3>
          )}
        </div>

        {/* Mobile Cart Icon - Right Side */}
        <div className="md:hidden flex items-center">
          <h3 onClick={() => navigate('/cart')} className="cursor-pointer text-sm font-medium text-black hover:text-[#c49a6c] transition-colors duration-200">
            CART
          </h3>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div className={`fixed top-0 left-0 h-full w-[250px] bg-white shadow-md transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <div className="p-5 flex flex-col h-full">
          <button onClick={() => setIsMenuOpen(false)} className="text-black text-2xl self-end">
            <HiX />
          </button>

          <nav className="mt-4 flex flex-col space-y-4 text-[#1a1a1a] text-sm font-semibold">
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-[#c49a6c] text-black">SHOP</Link>
            <Link to="/best-seller" onClick={() => setIsMenuOpen(false)} className="hover:text-[#c49a6c] text-black">BESTSELLERS</Link>
            <Link to="/party-wears" onClick={() => setIsMenuOpen(false)} className="hover:text-[#c49a6c] text-black">PARTY WEARS</Link>
            <Link to="/semi-party-wears" onClick={() => setIsMenuOpen(false)} className="hover:text-[#c49a6c] text-black">SEMI-PARTY WEARS</Link>
            <Link to="/co-ord-sets" onClick={() => setIsMenuOpen(false)} className="hover:text-[#c49a6c] text-black">CO-ORD SETS</Link>
            <Link to="/indo-western-outfits" onClick={() => setIsMenuOpen(false)} className="hover:text-[#c49a6c] text-black">INDO-WESTERN OUTFITS</Link>
          </nav>

          <div className="pt-6 text-[#1a1a1a] text-sm font-semibold">
            <h2 onClick={() => setIsMenuOpen(false)} className="cursor-pointer hover:text-[#c49a6c]">ACCOUNT</h2>
            <h3 onClick={() => { setIsMenuOpen(false); navigate('/cart'); }} className="cursor-pointer hover:text-[#c49a6c]">CART</h3>

            {isAuthenticated ? (
              <div className="pt-3 space-y-2">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#c49a6c] text-black">Profile</Link>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#c49a6c] text-black">Orders</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left w-full hover:text-[#c49a6c]">Logout</button>
              </div>
            ) : (
              <h3 className="cursor-pointer pt-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-[#c49a6c]">LOGIN</Link>
              </h3>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </header>
  );
};

export default Header;
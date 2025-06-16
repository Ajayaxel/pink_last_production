import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiBookmark } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ cart, setIsCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

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
        {/* Left Section */}
        <nav className="hidden md:flex space-x-6 text-black text-sm font-medium">
          <div className="relative group">
            <Link to="/shop" className="text-black">SHOP</Link>
            <div className="absolute top-full left-0 w-[600px] bg-white rounded-[10px] shadow-lg py-4 px-6 flex opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
              <div className="w-[200px] pr-4">
                <img
                  src="https://assets.ajio.com/medias/sys_master/root/20230718/DElg/64b6be4aeebac147fc7726fb/-1117Wx1400H-466368522-black-MODEL.jpg"
                  alt="Shop Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex-1 grid grid-cols-2 p-4 gap-x-6 text-sm text-black">
                <div className="space-y-2">
                  <Link to="/kurta" className="text-black block hover:text-[#c49a6c]">Kurta</Link>
                  <Link to="/saree" className="text-black block hover:text-[#c49a6c]">Saree</Link>
                  <Link to="/shop/all" className="text-black block hover:text-[#c49a6c]">View All</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link to="/best-seller" className="text-black">BESTSELLERS</Link>
            <div className="absolute top-full left-0 w-[500px] bg-white rounded-[10px] shadow-lg py-4 px-6 flex opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
              <div className="w-[200px] pr-4">
                <img src="/Rectangle 14.png" alt="Bestseller Preview" className="w-full h-auto object-cover" />
              </div>
              <div className="flex-1 grid grid-cols-2 p-4 gap-x-6 text-sm text-black">
                <div className="space-y-2">
                  <Link to="/best-seller/top" className="text-black block hover:text-[#c49a6c]">Top Picks</Link>
                  <Link to="/best-seller/women" className="text-black block hover:text-[#c49a6c]">Women</Link>
                </div>
                <div className="space-y-2">
                  <Link to="/best-seller/men" className="text-black block hover:text-[#c49a6c]">Men</Link>
                  <Link to="/best-seller/all" className="text-black block hover:text-[#c49a6c]">View All</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link to="/exclusive-collection" className="text-black">EXCLUSIVE COLLECTIONS</Link>
          </div>
        </nav>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center">
          <button onClick={() => navigate("/")} className="text-xl font-bold text-[#c49a6c] flex items-center">
            <img src="/New logo her pride gold black  1.png" alt="Logo" className="h-8 w-auto" />
          </button>
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-5 text-black text-lg">
          <FiSearch className="cursor-pointer" />
          <FiBookmark className="cursor-pointer" />
          <h2 className="cursor-pointer text-sm font-medium">ACCOUNT</h2>
          <h3
            onClick={() => navigate('/cart')}
            
            className="cursor-pointer text-sm font-medium"
          >
            CART
          </h3>

          {/* Authenticated Profile Avatar or Login */}
          {isAuthenticated ? (
            <div className="relative group cursor-pointer">
              <FaUserCircle className="text-2xl text-black" />
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg text-sm text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          ) : (
            <h3 className="cursor-pointer text-sm font-medium">
              <Link to="/login" className="text-black">LOGIN</Link>
            </h3>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden absolute left-4 text-black text-2xl"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Side Menu */}
      <div className={`fixed top-0 left-0 h-full w-[250px] bg-white shadow-md transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <div className="p-5 flex flex-col h-full">
          <button onClick={() => setIsMenuOpen(false)} className="text-black text-2xl self-end">
            <HiX />
          </button>
          <nav className="mt-5 flex flex-col space-y-4 text-black text-sm font-medium">
            <Link to="/shop" onClick={() => setIsMenuOpen(false)}>SHOP</Link>
            <Link to="/best-seller" onClick={() => setIsMenuOpen(false)}>BESTSELLERS</Link>
            <Link to="/exclusivecollections" onClick={() => setIsMenuOpen(false)}>EXCLUSIVE COLLECTIONS</Link>
          </nav>
          <div className="pt-2">
            <h2 onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-sm font-medium">ACCOUNT</h2>
            <h3
              onClick={() => navigate('/cart')}
              className="cursor-pointer text-sm font-medium"
            >
              CART
            </h3>

            {isAuthenticated ? (
              <div className="pt-3 space-y-2">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block text-sm">Profile</Link>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block text-sm">Orders</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-sm">Logout</button>
              </div>
            ) : (
              <h3 className="cursor-pointer text-sm pt-1 font-medium">
                <Link to="/login" className="text-black" onClick={() => setIsMenuOpen(false)}>LOGIN</Link>
              </h3>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;

import React from 'react';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const FotterSection = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="px-6 md:px-[50px]">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
          {/* Left section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <nav className="mb-[30px]">
              <ul className="grid grid-cols-2 gap-2 text-sm sm:text-base">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">Returns Policy</a></li>
                <li><a href="#" className="hover:underline">Terms Of Services</a></li>
                <li><a href="#" className="hover:underline">Shipping Policy</a></li>
              </ul>
            </nav>
          </div>
          
          {/* Center logo section */}
          <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img src="/New logo her pride gold black  1.png" alt="Pink Stories Logo" className="h-12 md:h-16 mx-auto" />
          </div>
          
          {/* Right section */}
          <div className="w-full md:w-1/3 text-center md:text-right mb-6 md:mb-0">
            <div className="text-sm md:text-base">
              <p>Behind Sharjah University - Muwaileh</p>
              <p>Commercial - Industrial Area</p>
              <p>Sharjah - United Arab Emirates</p>
            </div>
            
            {/* Social icons */}
            <div className="flex justify-center md:justify-end space-x-4 my-4">
              <a href="#" className="hover:text-gray-300"><FaFacebookF size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaWhatsapp size={20} /></a>
            </div>
            
            <p className="text-sm">Phone - +971 56 877 8602</p>
          </div>
        </div>
        
        {/* Bottom divider */}
        <div className="border-t border-gray-600 mt-8"></div>
        
        <div className="flex flex-col sm:flex-row text-center sm:text-left text-[14px] md:text-[16px] sm:justify-between pt-6">
          <p>Mail - Info@pinkstories.ae</p>
          <p>Copyright ©2025 Netplex All Rights Reserved</p>
          <p>Phone - +971 56 877 8602</p>
        </div>
      </div>
    </footer>
  );
};

export default FotterSection;





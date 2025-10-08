import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiBookmark } from 'react-icons/fi';

const Navbar = () => {
  return (
    <div className="w-full h-[55px] bg-[#FCDEE1] px-[20px] md:px-[50px] relative flex items-center justify-center">
      <nav className="hidden md:flex space-x-6 text-black text-sm font-medium relative z-50">
        {/* PARTY WEARS */}
        <div className="relative group">
          <Link to="/party-wears" className="text-black">PARTY WEARS</Link>
          {/* <div className="absolute top-full left-0 w-[600px] bg-white rounded-[10px] shadow-lg py-4 px-6 flex opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
            <div className="w-[200px] pr-4">
              <img src="/1000348820.jpg" alt="Party Wears" className="w-full h-auto object-cover" />
            </div>
            <div className="flex-1 grid grid-cols-2 p-4 gap-x-6 text-sm text-black">
              <div className="space-y-2">
                <Link to="/party-wears/eid-2025" className="text-black block hover:text-[#c49a6c]">Eid 2025 <span className="text-pink-400 font-bold text-xs ml-1">New</span></Link>
                <Link to="/party-wears/girls" className="text-black block hover:text-[#c49a6c]">Girls</Link>
                <Link to="/party-wears/matching" className="text-black block hover:text-[#c49a6c]">Matching Sets</Link>
              </div>
             
            </div>
          </div> */}
        </div>

        {/* SEMI-PARTY WEARS */}
        <div className="relative group">
          <Link to="/semi-party-wears" className="text-black">SEMI-PARTY WEARS</Link>
          {/* <div className="absolute top-full left-0 w-[600px] bg-white rounded-[10px] shadow-lg py-4 px-6 flex opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
            <div className="w-[200px] pr-4">
              <img src="/GK_06538-min.JPG" alt="Semi Party Wears" className="w-full h-auto object-cover" />
            </div>
            <div className="flex-1 grid grid-cols-2 p-4 gap-x-6 text-sm text-black">
              <div className="space-y-2">
                <Link to="/semi-party-wears/tops" className="text-black block hover:text-[#c49a6c]">Tops</Link>
                <Link to="/semi-party-wears/kurti" className="text-black block hover:text-[#c49a6c]">Kurti Sets</Link>
              </div>
              <div className="space-y-2">
                <Link to="/semi-party-wears/fusion" className="text-black block hover:text-[#c49a6c]">Fusion Wear</Link>
                <Link to="/semi-party-wears/all" className="text-black block hover:text-[#c49a6c]">View All</Link>
              </div>
            </div>
          </div> */}
        </div>

        {/* CO-ORD SETS */}
        <div className="relative group">
          <Link to="/co-ord-sets" className="text-black">CO-ORD SETS</Link>
          {/* <div className="absolute top-full left-0 w-[600px] bg-white rounded-[10px] shadow-lg py-4 px-6 flex opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
            <div className="w-[200px] pr-4">
              <img src="/GK_06568-min.JPG" alt="Co-ord Sets" className="w-full h-auto object-cover" />
            </div>
            <div className="flex-1 grid grid-cols-2 p-4 gap-x-6 text-sm text-black">
              <div className="space-y-2">
                <Link to="/co-ord-sets/girls" className="text-black block hover:text-[#c49a6c]">Girls Sets</Link>
                <Link to="/co-ord-sets/matching" className="text-black block hover:text-[#c49a6c]">Matching Pairs</Link>
              </div>
              <div className="space-y-2">
                <Link to="/co-ord-sets/mommy-me" className="text-black block hover:text-[#c49a6c]">Mommy & Me</Link>
                <Link to="/co-ord-sets/all" className="text-black block hover:text-[#c49a6c]">View All</Link>
              </div>
            </div>
          </div> */}
        </div>

        {/* INDO-WESTERN OUTFITS */}
        <div className="relative group">
          <Link to="/indo-western-outfits" className="text-black">INDO-WESTERN OUTFITS</Link>
          {/* <div className="absolute top-full left-0 w-[600px] bg-white rounded-[10px] shadow-lg py-4 px-6 flex opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
            <div className="w-[200px] pr-4">
              <img src="/P (12)-min.jpg" alt="Indo-Western" className="w-full h-auto object-cover" />
            </div>
            <div className="flex-1 grid grid-cols-2 p-4 gap-x-6 text-sm text-black">
              <div className="space-y-2">
                <Link to="/indo-western/fusion-girls" className="text-black block hover:text-[#c49a6c]">Fusion Girls</Link>
                <Link to="/indo-western/jacket-sets" className="text-black block hover:text-[#c49a6c]">Jacket Sets</Link>
              </div>
              <div className="space-y-2">
                <Link to="/indo-western/occasion-wear" className="text-black block hover:text-[#c49a6c]">Occasion Wear</Link>
                <Link to="/indo-western/all" className="text-black block hover:text-[#c49a6c]">View All</Link>
              </div>
            </div>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;



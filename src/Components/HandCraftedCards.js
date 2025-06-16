import React from "react";
import { FiBookmark } from "react-icons/fi";

const HandCraftedCards = () => {
  const newArrivals = [
  "Rectangle 11.png",
    "Rectangle 12.png",
    "Rectangle 13.png",
    
  ];
  const handcraftedKurtas = [
  "Rectangle 14.png",
    "Rectangle 15.png",
    "Rectangle 16.png",
  ];

  return (
    <div className="w-full px-[50px] py-[80px]">
      {/* New Arrivals Section */}
      <div className="flex justify-between items-center pb-6">
        <h2 className="text-3xl font-semibold text-black">HAND CRAFTED SAREES</h2>
        <h3 className="text-lg font-medium text-black cursor-pointer">VIEW ALL</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newArrivals.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`New Arrival ${index + 1}`}
              className="w-full h-auto object-cover rounded-md"
            />
            <div className="mt-3 flex justify-between items-center">
              <p className="text-black text-sm">Lorem ipsum dolor sit amet consectetur.</p>
              <FiBookmark className="text-black cursor-pointer" />
            </div>
            <p className="text-black font-semibold text-lg mt-1">₹5000</p>
          </div>
        ))}
      </div>

      {/* Hand Crafted Kurtas Section */}
      <div className="flex justify-between items-center py-10">
        <h2 className="text-3xl font-semibold text-black">HAND CRAFTED DRESSES</h2>
        <h3 className="text-lg font-medium text-black cursor-pointer">VIEW ALL</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {handcraftedKurtas.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`Kurta ${index + 1}`}
              className="w-full h-auto object-cover rounded-md"
            />
            <div className="mt-3 flex justify-between items-center">
              <p className="text-black text-sm">Lorem ipsum dolor sit amet consectetur.</p>
              <FiBookmark className="text-black cursor-pointer" />
            </div>
            <p className="text-black font-semibold text-lg mt-1">₹5000</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandCraftedCards;
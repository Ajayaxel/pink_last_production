import React from 'react';

const Hero = () => {
  return (
    <div className="w-full max-w-none min-h-screen flex flex-col sm:flex-col md:flex-row overflow-hidden">
      {/* Left Image */}
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-[50vh] sm:h-[60vh] md:h-screen relative overflow-hidden flex-shrink-0">
        <img
          src="GK_06568-min.JPG" // Replace with your image URL AJX03420.JPG
          alt="Left"
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        {/* Optional overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      
      {/* Right Image */}
      <div className="w-full max-w-none md:w-1/2 h-[50vh] sm:h-[60vh] md:h-screen relative overflow-hidden flex-shrink-0">
        <img
          src="1000348820.jpg" // Replace with your second image URL AJX03410.JPG
          alt="Right"
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        {/* Optional overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
    </div>
  );
};

export default Hero;
import React from 'react';

const Hero = () => {
  return (
    <div className="w-full h-[831px] flex flex-col md:flex-row">
      {/* Left Image */}
      <div className="w-full md:w-1/2 h-[400px] md:h-full">
        <img
          src="Rectangle 2.png" // Replace with your image URL
          alt="Left"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 h-[400px] md:h-full">
        <img
          src="Rectangle 3 (1).png" // Replace with your second image URL
          alt="Right"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;

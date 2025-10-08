import React from "react";

const BannerCard = () => {
  return (
    <div className="w-full h-[700px] items-center justify-center flex">
      <div className="w-full h-auto">
        <img
          src="GK_06538-min.JPG"
          alt="Banner Image"
          className="object-cover object-[center_top_30%] h-[600px] w-full"
          style={{ objectPosition: 'center 23%' }}
        />
      </div>
    </div>
  );
};

export default BannerCard;
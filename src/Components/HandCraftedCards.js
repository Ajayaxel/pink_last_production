import React, { useEffect, useState } from "react";
import { FiBookmark } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const HandCraftedCards = () => {
  const navigate = useNavigate();
  const [coordSets, setCoordSets] = useState([]);
  const [semiPartyWear, setSemiPartyWear] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://backend.pinkstories.ae/api/products");
        const allProducts = res.data?.data || [];
        
        // Filter products for co-ord sets
        const coordSets = allProducts.filter(p => 
          p.category?.toLowerCase().includes('co-ord') || 
          p.category?.toLowerCase().includes('coord') ||
          p.category?.toLowerCase().includes('co ord') ||
          p.productName?.toLowerCase().includes('co-ord') ||
          p.productName?.toLowerCase().includes('coord') ||
          p.productName?.toLowerCase().includes('co ord') ||
          p.description?.toLowerCase().includes('co-ord') ||
          p.description?.toLowerCase().includes('coord') ||
          p.description?.toLowerCase().includes('co ord') ||
          p.description?.toLowerCase().includes('set')
        ).slice(0, 3); // Limit to 3 items
        
        // Filter products for semi party wear
        const semiPartyWear = allProducts.filter(p => 
          p.category?.toLowerCase().includes('semi party') || 
          p.category?.toLowerCase().includes('party wear') ||
          p.category?.toLowerCase().includes('semi-party') ||
          p.productName?.toLowerCase().includes('semi party') ||
          p.productName?.toLowerCase().includes('party wear') ||
          p.productName?.toLowerCase().includes('semi-party') ||
          p.description?.toLowerCase().includes('semi party') ||
          p.description?.toLowerCase().includes('party wear') ||
          p.description?.toLowerCase().includes('semi-party') ||
          p.description?.toLowerCase().includes('occasion wear')
        ).slice(0, 3); // Limit to 3 items
        
        setCoordSets(coordSets);
        setSemiPartyWear(semiPartyWear);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Build image URL similar to CasualsPage
  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  // Format price display
  const formatPrice = (price) => {
    return `AED ${price?.toLocaleString() || '0'}`;
  };

  // Generate mock data for demonstration (similar to CasualsPage)
  const generateMockData = (item) => {
    const discounts = [0, 17, 24, 36, 51, 60, 65, 73];
    const discount = discounts[Math.floor(Math.random() * discounts.length)];
    const originalPrice = Math.floor(item.price * (1 + Math.random() * 0.5));
    
    return {
      discount,
      originalPrice
    };
  };

  // Handle product click navigation
  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/shop-details/${productId}`);
    }
  };

  // Handle bookmark click (prevent event bubbling)
  const handleBookmarkClick = (e, productId) => {
    e.stopPropagation();
    // Add your bookmark functionality here
    console.log(`Bookmarked product: ${productId}`);
  };

  if (loading) {
    return (
      <div className="w-full px-[50px] py-[80px]">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading co-ord sets and semi party wear...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-[50px] py-[80px]">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const ProductCard = ({ product, index }) => {
    const mockData = generateMockData(product);
    
    return (
      <div 
        key={product._id || index} 
        className="relative group cursor-pointer"
        onClick={() => handleProductClick(product._id)}
      >
        <div className="relative overflow-hidden rounded-md">
          <img
            src={buildImageUrl(product.images?.[0])}
            alt={product.productName || `Product ${index + 1}`}
            className="w-full h-auto object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          {mockData.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
              {mockData.discount}% OFF
            </div>
          )}
          
          {/* Hover overlay effect similar to ShopPage */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-md"></div>
        </div>
        
        <div className="mt-3 flex justify-between items-start">
          <div className="flex-1">
            <p className="text-black text-sm line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">
              {product.productName || product.description || "Handcrafted Collection"}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-black font-semibold text-lg">
                {formatPrice(product.price)}
              </p>
              {mockData.discount > 0 && (
                <p className="text-gray-500 text-sm line-through">
                  {formatPrice(mockData.originalPrice)}
                </p>
              )}
            </div>
            {product.brand && (
              <p className="text-gray-600 text-xs mt-1">
                by {product.brand}
              </p>
            )}
          </div>
          <FiBookmark 
            className="text-black cursor-pointer hover:text-pink-500 transition-colors ml-2 flex-shrink-0" 
            onClick={(e) => handleBookmarkClick(e, product._id)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-[50px] py-[80px]">
      {/* Co-ord Sets Section */}
      <div className="flex justify-between items-center pb-6">
        <h2 className="text-3xl font-semibold text-black">CO-ORD SETS</h2>
        <h3 
          className="text-lg font-medium text-black cursor-pointer hover:text-pink-500 transition-colors"
          onClick={() => navigate('/co-ord-sets')} // Navigate to shop page with potential filter
        >
          VIEW ALL 
        </h3>
      </div>

      {coordSets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coordSets.map((product, index) => (
            <ProductCard key={product._id || index} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No co-ord sets available at the moment.</p>
        </div>
      )}

      {/* Semi Party Wear Section */}
      <div className="flex justify-between items-center py-10">
        <h2 className="text-3xl font-semibold text-black">SEMI PARTY WEAR</h2>
        <h3 
          className="text-lg font-medium text-black cursor-pointer hover:text-pink-500 transition-colors"
          onClick={() => navigate('semi-party-wears')} // Navigate to shop page with potential filter
        >
          VIEW ALL
        </h3>
      </div>

      {semiPartyWear.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {semiPartyWear.map((product, index) => (
            <ProductCard key={product._id || index} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No semi party wear available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default HandCraftedCards;
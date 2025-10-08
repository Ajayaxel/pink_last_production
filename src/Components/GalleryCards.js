import React, { useEffect, useState } from "react";
import { FiBookmark } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";

const GalleryCards = () => {
  const navigate = useNavigate();
  const { fetchProducts, products } = useProductStore();
  
  const [newArrivals, setNewArrivals] = useState([]);
  const [partyWares, setPartyWares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Build image URL function
  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  // Helper function to check if a product is newly uploaded (within last 30 days)
  const isNewlyUploaded = (product) => {
    const dateFields = [
      'createdAt', 'uploadDate', 'dateAdded', 'created_at', 
      'upload_date', 'date_added', 'updatedAt', 'updated_at'
    ];
    
    let productDate = null;
    
    for (const field of dateFields) {
      if (product[field]) {
        productDate = new Date(product[field]);
        if (!isNaN(productDate.getTime())) {
          break;
        }
      }
    }
    
    if (!productDate || isNaN(productDate.getTime())) {
      return false;
    }
    
    const currentDate = new Date();
    const daysDifference = (currentDate - productDate) / (1000 * 60 * 60 * 24);
    
    return daysDifference <= 30; // Products added within last 30 days
  };

  // Load and filter products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        await fetchProducts();
        
        if (products && products.length > 0) {
          // Filter for newly uploaded products
          const recentProducts = products
            .filter(product => isNewlyUploaded(product))
            .sort((a, b) => {
              // Sort by upload date (newest first)
              const dateA = new Date(a.dateAdded || a.createdAt || a.uploadDate || 0);
              const dateB = new Date(b.dateAdded || b.createdAt || b.uploadDate || 0);
              return dateB - dateA;
            });

          // Set new arrivals (first 3 newest products)
          setNewArrivals(recentProducts.slice(0, 3));

          // Filter for party wear products
          const partyWearProducts = products
            .filter(product => 
              product.productName?.toLowerCase().includes('party') ||
              product.productName?.toLowerCase().includes('evening') ||
              product.productName?.toLowerCase().includes('formal') ||
              product.productName?.toLowerCase().includes('wedding') ||
              product.description?.toLowerCase().includes('party') ||
              product.category?.toLowerCase().includes('party') ||
              product.tags?.some(tag => 
                tag.toLowerCase().includes('party') || 
                tag.toLowerCase().includes('evening') ||
                tag.toLowerCase().includes('formal')
              )
            )
            .slice(0, 3);

          // If no party wear found, use general products excluding new arrivals
          if (partyWearProducts.length === 0) {
            const otherProducts = products
              .filter(product => 
                !recentProducts.some(newProduct => newProduct._id === product._id)
              )
              .slice(0, 3);
            setPartyWares(otherProducts);
          } else {
            setPartyWares(partyWearProducts);
          }

          // If no new arrivals found, use first 3 products
          if (recentProducts.length === 0) {
            setNewArrivals(products.slice(0, 3));
          }
        }
        
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [fetchProducts, products]);

  // Navigate to product details
  const handleProductClick = (product) => {
    navigate(`/shop-details/${product._id}`);
  };

  // Toggle wishlist function (implement according to your wishlist logic)
  const toggleWishlist = (productId) => {
    console.log(`Toggle wishlist for product: ${productId}`);
    // Implement your wishlist logic here
  };

  if (loading) {
    return (
      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="flex flex-col sm:flex-row justify-center items-center min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-pink-500 mb-4 sm:mb-0 sm:mr-4"></div>
          <div className="text-base sm:text-lg text-gray-600 text-center sm:text-left">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="flex justify-center items-center min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
          <div className="text-base sm:text-lg text-red-600 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
          <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 lg:py-16 xl:py-20">
      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 sm:pb-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-2 sm:mb-0">NEW ARRIVALS</h2>
            <h3 
              className="text-sm sm:text-base lg:text-lg font-medium text-black cursor-pointer hover:text-gray-700 transition-colors underline sm:no-underline"
              onClick={() => navigate('/shop?category=new-arrivals')}
            >
              VIEW ALL
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {newArrivals.map((product, index) => (
              <div
                key={product._id || index}
                className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-pink-200 hover:-translate-y-1"
                onClick={() => handleProductClick(product)}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={buildImageUrl(product.images?.[0] || product.image)}
                    alt={product.productName || `New Arrival ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  
                  {/* Discount Badge */}
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                  
                  {/* New Badge */}
                  {isNewlyUploaded(product) && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      NEW
                    </div>
                  )}

                  {/* Quick View Overlay - Hidden on mobile for better UX */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 items-center justify-center hidden sm:flex">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white rounded-full p-3 shadow-xl backdrop-blur-sm">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  {/* Product Name */}
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200 leading-tight">
                    {product.productName || product.description || "Lorem ipsum dolor sit amet consectetur."}
                  </h2>

                  {/* Material */}
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm text-gray-600 capitalize font-medium truncate">
                      {product.material || "Premium Material"}
                    </p>
                  </div>

                  {/* Price and Wishlist */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        AED {product.price || "N/A"}
                      </span>
                      {product.discount > 0 && product.discount < 100 && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          AED {((product.price || 0) / (1 - product.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <FiBookmark 
                      className="text-gray-400 hover:text-pink-500 transition-colors cursor-pointer text-lg sm:text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product._id);
                      }}
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="text-xs sm:text-sm text-gray-500">4.5 (120 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Party Wares Section */}
      {partyWares.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 sm:pb-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-2 sm:mb-0">PARTY WARES</h2>
            <h3 
              className="text-sm sm:text-base lg:text-lg font-medium text-black cursor-pointer hover:text-gray-700 transition-colors underline sm:no-underline"
              onClick={() => navigate('/party-wears')}
            >
              VIEW ALL
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
            {partyWares.map((product, index) => (
              <div
                key={product._id || index}
                className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-pink-200 hover:-translate-y-1"
                onClick={() => handleProductClick(product)}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={buildImageUrl(product.images?.[0] || product.image)}
                    alt={product.productName || `Party Wear ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  
                  {/* Discount Badge */}
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Quick View Overlay - Hidden on mobile for better UX */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 items-center justify-center hidden sm:flex">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white rounded-full p-3 shadow-xl backdrop-blur-sm">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  {/* Product Name */}
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200 leading-tight">
                    {product.productName || product.description || "Lorem ipsum dolor sit amet consectetur."}
                  </h2>

                  {/* Material */}
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm text-gray-600 capitalize font-medium truncate">
                      {product.material || "Premium Material"}
                    </p>
                  </div>

                  {/* Price and Wishlist */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        AED {product.price || "N/A"}
                      </span>
                      {product.discount > 0 && product.discount < 100 && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          AED {((product.price || 0) / (1 - product.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <FiBookmark 
                      className="text-gray-400 hover:text-pink-500 transition-colors cursor-pointer text-lg sm:text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product._id);
                      }}
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="text-xs sm:text-sm text-gray-500">4.5 (120 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* No products found */}
      {newArrivals.length === 0 && partyWares.length === 0 && (
        <div className="flex justify-center items-center min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
          <div className="text-center px-4">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 opacity-50">🛍️</div>
            <div className="text-base sm:text-lg text-gray-600 mb-2">No products found</div>
            <p className="text-xs sm:text-sm text-gray-500">Please check back later for new arrivals</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryCards;
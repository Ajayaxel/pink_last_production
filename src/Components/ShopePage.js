// Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterSection from "./FotterSection";
import { FaChevronDown, FaSort } from "react-icons/fa";
import { useProductStore } from "../store/product";

const ShopPage = ({ heading = "Shop" }) => {
  const navigate = useNavigate();
  const { fetchProducts, products } = useProductStore();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Relevance");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    return `https://backend.pinkstories.ae/${imgPath.replace(/^\/+/, '')}`;
  };
  ;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    loadProducts();
  }, [fetchProducts]);

  const getSortedProducts = () => {
    const sorted = [...products];
    let filtered = sorted;

    if (selectedCategory) {
      filtered = sorted.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (sortOption === "Newest First") {
      filtered.sort(
        (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
    }

    return filtered;
  };

  const handleSortSelection = (option) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  const sortedProducts = getSortedProducts();

  const getImageUrl = (path) => {
    if (!path) return "/fallback-image.png";
    const relativePath = path.split("/uploads/")[1];
    return `https://backend.pinkstories.ae/api/uploads/${relativePath}`;
  };

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Filter Overlay - Enhanced Responsive Design */}
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          <div className="fixed top-16 sm:top-20 left-2 right-2 sm:left-4 md:left-20 md:right-auto bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-2xl z-50 w-auto md:w-72 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">Filter by Category</h3>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <button
                className={`text-left py-2 px-3 rounded-lg transition-colors ${
                  selectedCategory === "" 
                    ? "font-bold text-blue-600 bg-blue-50" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory("")}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`text-left py-2 px-3 rounded-lg transition-colors ${
                    selectedCategory === cat 
                      ? "font-bold text-blue-600 bg-blue-50" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Header - Enhanced Responsive Design */}
      <div className="px-3 sm:px-6 lg:px-12 py-4 sm:py-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
            onClick={() => setIsFilterOpen(true)}
          >
            <img src="/Filter.png" alt="Filter" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-md font-medium">FILTER</span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center order-first sm:order-none">{heading}</h1>

          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <FaSort className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm lg:text-md font-medium">
                SORT: <span className="hidden sm:inline">{sortOption}</span>
                <span className="sm:hidden">{sortOption.split(':')[0] || sortOption}</span>
              </span>
              <FaChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
            </div>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white shadow-2xl rounded-xl border z-50">
                {["Relevance", "Price: Low to High", "Price: High to Low", "Newest First"].map(
                  (option) => (
                    <div
                      key={option}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm sm:text-base first:rounded-t-xl last:rounded-b-xl transition-colors"
                      onClick={() => handleSortSelection(option)}
                    >
                      {option}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid - Enhanced Responsive Design */}
      <div className="px-3 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh] sm:min-h-[400px]">
            <div className="text-center px-4">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-pink-500 mx-auto mb-4 sm:mb-6"></div>
              <p className="text-lg sm:text-xl text-gray-600 font-medium">Loading products...</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">Please wait while we fetch the latest items</p>
            </div>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="flex justify-center items-center min-h-[50vh] sm:min-h-[400px]">
            <div className="text-center px-4">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 opacity-50">🛍️</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
              <button 
                onClick={() => setSelectedCategory("")}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm sm:text-base"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {sortedProducts.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-pink-200 hover:-translate-y-1"
                onClick={() => navigate(`/shop-details/${item._id}`)}
              >
                {/* Image Container - Responsive */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={item.images?.length ? buildImageUrl(item.images[0]) : '/placeholder-image.jpg'}
                    alt={item.productName}
                    className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Discount Badge - Responsive */}
                  {item.discount && (
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      -{item.discount}%
                    </div>
                  )}
                  
                  {/* Quick View Overlay - Hidden on mobile, visible on larger screens */}
                  <div className="hidden sm:flex absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white rounded-full p-3 shadow-xl backdrop-blur-sm">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* New Badge for recent products - Responsive */}
                  {item.dateAdded && new Date(item.dateAdded) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      NEW
                    </div>
                  )}
                </div>

                {/* Product Info - Responsive */}
                <div className="p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
                  {/* Product Name - Responsive */}
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200 leading-tight">
                    {item.productName}
                  </h2>

                  {/* Material - Hidden on small screens, visible on medium+ */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <p className="text-xs sm:text-sm text-gray-600 capitalize font-medium">
                      {item.material || "Premium Material"}
                    </p>
                  </div>

                  {/* Price Section - Responsive */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                        AED {item.price ?? "N/A"}
                      </span>
                      {item.discount && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          AED {Math.round((item.price || 0) / (1 - item.discount / 100))}
                        </span>
                      )}
                    </div>
                    {/* Star rating - Hidden on mobile for space */}
                    <div className="hidden md:flex items-center space-x-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="text-xs text-gray-500">4.5</span>
                    </div>
                  </div>

                  {/* Color Variants - Responsive, hidden on very small screens */}
                  {item.colorVariants && (
                    <div className="hidden xs:flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 font-medium">Colors:</span>
                        <div className="flex space-x-1">
                          {(() => {
                            try {
                              const colors = JSON.parse(item.colorVariants[0] || "[]");
                              if (!Array.isArray(colors)) return null;
                              return colors.slice(0, 3).map((color, index) => (
                                <div
                                  key={color}
                                  className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full border-2 border-white shadow-md ring-1 ring-gray-200 hover:scale-110 transition-transform cursor-pointer"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ));
                            } catch (error) {
                              console.error("Invalid JSON in colorVariants:", error);
                              return null;
                            }
                          })()}
                          {(() => {
                            try {
                              const colors = JSON.parse(item.colorVariants[0] || "[]");
                              if (Array.isArray(colors) && colors.length > 3) {
                                return (
                                  <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
                                    <span className="text-xs text-gray-600 font-bold">+{colors.length - 3}</span>
                                  </div>
                                );
                              }
                              return null;
                            } catch (error) {
                              return null;
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  )}

           
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default ShopPage;

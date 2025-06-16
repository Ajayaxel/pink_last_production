import React, { useEffect, useState } from 'react';
import { FiBookmark, FiX, FiChevronDown, FiFilter, FiStar } from "react-icons/fi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartyWearsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([50, 10000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState({});

  // Available filter options (you can modify these based on your actual data)
  const availableColors = ["Purple", "Black", "Red", "Orange", "Navy", "White", "Blue", "Green", "Pink", "Yellow"];
  const availableDiscounts = ["10-20%", "20-30%", "30-40%", "40-50%", "50-60%", "60%+"];
  const availablePatterns = ["Solid", "Printed", "Embroidered", "Striped", "Floral"];
  const availableFabrics = ["Cotton", "Silk", "Polyester", "Rayon", "Linen"];
  const availableOccasions = ["Casual", "Party", "Wedding", "Festival", "Office"];
  const availableRatings = ["4+", "3+", "2+", "1+"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend.pinkstories.ae/api/products");
        const allProducts = res.data?.data || [];
        const partywears = allProducts.filter(p => p.category?.toLowerCase() === 'party wears');
        setProducts(partywears);
        setFilteredProducts(partywears);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  // Check if any filters are active
  const hasActiveFilters = () => {
    return selectedColors.length > 0 ||
           priceRange[0] !== 50 || priceRange[1] !== 10000 ||
           selectedBrands.length > 0 ||
           selectedDiscounts.length > 0 ||
           selectedPatterns.length > 0 ||
           selectedFabrics.length > 0 ||
           selectedOccasions.length > 0 ||
           selectedRatings.length > 0;
  };

  // Apply filters only when filters are active
  useEffect(() => {
    if (hasActiveFilters()) {
      applyFilters();
    } else {
      // Show all products when no filters are active
      setFilteredProducts(products);
    }
  }, [products, selectedColors, priceRange, selectedBrands, selectedDiscounts, selectedPatterns, selectedFabrics, selectedOccasions, selectedRatings]);

  const applyFilters = () => {
    let filtered = [...products];

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        selectedColors.some(color => 
          product.productName?.toLowerCase().includes(color.toLowerCase()) ||
          product.description?.toLowerCase().includes(color.toLowerCase())
        )
      );
    }

    // Price filter (only apply if range is modified from default)
    if (priceRange[0] !== 50 || priceRange[1] !== 10000) {
      filtered = filtered.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }

    // Discount filter
    if (selectedDiscounts.length > 0) {
      filtered = filtered.filter(product => {
        const discount = product.discount || 0;
        return selectedDiscounts.some(range => {
          if (range === "10-20%") return discount >= 10 && discount < 20;
          if (range === "20-30%") return discount >= 20 && discount < 30;
          if (range === "30-40%") return discount >= 30 && discount < 40;
          if (range === "40-50%") return discount >= 40 && discount < 50;
          if (range === "50-60%") return discount >= 50 && discount < 60;
          if (range === "60%+") return discount >= 60;
          return false;
        });
      });
    }

    // Pattern filter
    if (selectedPatterns.length > 0) {
      filtered = filtered.filter(product => 
        selectedPatterns.some(pattern => 
          product.productName?.toLowerCase().includes(pattern.toLowerCase()) ||
          product.description?.toLowerCase().includes(pattern.toLowerCase())
        )
      );
    }

    // Fabric filter
    if (selectedFabrics.length > 0) {
      filtered = filtered.filter(product => 
        selectedFabrics.some(fabric => 
          product.productName?.toLowerCase().includes(fabric.toLowerCase()) ||
          product.description?.toLowerCase().includes(fabric.toLowerCase())
        )
      );
    }

    // Occasion filter
    if (selectedOccasions.length > 0) {
      filtered = filtered.filter(product => 
        selectedOccasions.some(occasion => 
          product.productName?.toLowerCase().includes(occasion.toLowerCase()) ||
          product.description?.toLowerCase().includes(occasion.toLowerCase())
        )
      );
    }

    // Rating filter (using mock data for demonstration)
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product => {
        const mockData = generateMockData(product);
        return selectedRatings.some(rating => {
          const minRating = parseInt(rating.replace('+', ''));
          return mockData.rating >= minRating;
        });
      });
    }

    setFilteredProducts(filtered);
  };

  const toggleFilter = (filterName) => {
    setOpenFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const toggleColor = (color) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const toggleDiscount = (discount) => {
    setSelectedDiscounts(prev => prev.includes(discount) ? prev.filter(d => d !== discount) : [...prev, discount]);
  };

  const togglePattern = (pattern) => {
    setSelectedPatterns(prev => prev.includes(pattern) ? prev.filter(p => p !== pattern) : [...prev, pattern]);
  };

  const toggleFabric = (fabric) => {
    setSelectedFabrics(prev => prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]);
  };

  const toggleOccasion = (occasion) => {
    setSelectedOccasions(prev => prev.includes(occasion) ? prev.filter(o => o !== occasion) : [...prev, occasion]);
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev => prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]);
  };

  const clearAllFilters = () => {
    setSelectedColors([]);
    setPriceRange([50, 10000]);
    setSelectedBrands([]);
    setSelectedDiscounts([]);
    setSelectedPatterns([]);
    setSelectedFabrics([]);
    setSelectedOccasions([]);
    setSelectedRatings([]);
  };

  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  // Mock function to generate random ratings and reviews (you can replace with actual API data)
  const generateMockData = (item) => {
    const ratings = [3.5, 3.8, 4.1, 4.2, 4.5];
    const reviews = [34, 408, 551, 1600, 2100, 5200, 21900];
    const discounts = [0, 17, 24, 36, 51, 60, 65, 73];
    
    return {
      rating: ratings[Math.floor(Math.random() * ratings.length)],
      reviews: reviews[Math.floor(Math.random() * reviews.length)],
      discount: discounts[Math.floor(Math.random() * discounts.length)],
      originalPrice: Math.floor(item.price * (1 + Math.random() * 0.5))
    };
  };

  const formatReviews = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  // Get unique brands from products
  const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* Sidebar Filter */}
      <div className={`w-full md:w-64 bg-white border-r border-gray-200 transition-all duration-300 p-5 ${isFilterOpen ? 'block' : 'hidden'} md:block max-h-screen overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters() && (
              <button 
                onClick={clearAllFilters}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            )}
            <FiX className="md:hidden cursor-pointer text-xl" onClick={() => setIsFilterOpen(false)} />
          </div>
        </div>



        <div className="mb-6">
          <h4 className="font-semibold mb-2">Price</h4>
          <div className="space-y-2">
            <input
              type="range"
              min="50" 
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([50, parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <input
                type="number"
                min="50"
                max="10000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 50, priceRange[1]])}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-xs"
                placeholder="Min"
              />
              <span className="text-xs text-gray-500">to</span>
              <input
                type="number"
                min="50"
                max="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-xs"
                placeholder="Max"
              />
            </div>
            <p className="text-sm mt-1">AED {priceRange[0]} - AED {priceRange[1]}</p>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('Brand')}>
            <h3 className="text-md font-medium">Brand</h3>
            <FiChevronDown className={`transition-transform ${openFilters['Brand'] ? 'rotate-180' : ''}`} />
          </div>
          {openFilters['Brand'] && (
            <div className="mt-2 space-y-2">
              {uniqueBrands.map(brand => (
                <label key={brand} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="mr-2"
                  />
                  {brand}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Discount Filter */}
        <div className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('Discount')}>
            <h3 className="text-md font-medium">Discount</h3>
            <FiChevronDown className={`transition-transform ${openFilters['Discount'] ? 'rotate-180' : ''}`} />
          </div>
          {openFilters['Discount'] && (
            <div className="mt-2 space-y-2">
              {availableDiscounts.map(discount => (
                <label key={discount} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={selectedDiscounts.includes(discount)}
                    onChange={() => toggleDiscount(discount)}
                    className="mr-2"
                  />
                  {discount}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Pattern Filter */}
        <div className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('Pattern')}>
            <h3 className="text-md font-medium">Pattern</h3>
            <FiChevronDown className={`transition-transform ${openFilters['Pattern'] ? 'rotate-180' : ''}`} />
          </div>
          {openFilters['Pattern'] && (
            <div className="mt-2 space-y-2">
              {availablePatterns.map(pattern => (
                <label key={pattern} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={selectedPatterns.includes(pattern)}
                    onChange={() => togglePattern(pattern)}
                    className="mr-2"
                  />
                  {pattern}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Fabric Filter */}
        <div className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('Fabric')}>
            <h3 className="text-md font-medium">Fabric</h3>
            <FiChevronDown className={`transition-transform ${openFilters['Fabric'] ? 'rotate-180' : ''}`} />
          </div>
          {openFilters['Fabric'] && (
            <div className="mt-2 space-y-2">
              {availableFabrics.map(fabric => (
                <label key={fabric} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={selectedFabrics.includes(fabric)}
                    onChange={() => toggleFabric(fabric)}
                    className="mr-2"
                  />
                  {fabric}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Occasion Filter */}
        <div className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('Occasion')}>
            <h3 className="text-md font-medium">Occasion</h3>
            <FiChevronDown className={`transition-transform ${openFilters['Occasion'] ? 'rotate-180' : ''}`} />
          </div>
          {openFilters['Occasion'] && (
            <div className="mt-2 space-y-2">
              {availableOccasions.map(occasion => (
                <label key={occasion} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={selectedOccasions.includes(occasion)}
                    onChange={() => toggleOccasion(occasion)}
                    className="mr-2"
                  />
                  {occasion}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Customer Ratings Filter */}
        <div className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('Customer Ratings')}>
            <h3 className="text-md font-medium">Customer Ratings</h3>
            <FiChevronDown className={`transition-transform ${openFilters['Customer Ratings'] ? 'rotate-180' : ''}`} />
          </div>
          {openFilters['Customer Ratings'] && (
            <div className="mt-2 space-y-2">
              {availableRatings.map(rating => (
                <label key={rating} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => toggleRating(rating)}
                    className="mr-2"
                  />
                  {rating} Stars & Above
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            
            <p className="text-sm text-gray-600">
              {hasActiveFilters() 
                ? `${filteredProducts.length} products found` 
                : `${products.length} products available`
              }
            </p>
          </div>
          <button
            className="md:hidden flex items-center text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded"
            onClick={() => setIsFilterOpen(true)}
          >
            <FiFilter className="mr-2" /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredProducts.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">
              {hasActiveFilters() 
                ? "🚫 No products found matching your filters." 
                : "🚫 No party wear products found."
              }
            </p>
          ) : (
            filteredProducts.map(item => {
              const mockData = generateMockData(item);
              return (
                <div
                key={item._id}
                className="bg-white  transition cursor-pointer"
                onClick={() => navigate(`/shop-details/${item._id}`)}>
                <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group relative">
                  {/* New Badge */}
                  {Math.random() > 0.8 && (
                    <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded z-10">
                      NEW
                    </div>
                  )}
                  
                  {/* AD Badge */}
                  {Math.random() > 0.7 && (
                    <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded z-10">
                      AD
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.images?.length ? buildImageUrl(item.images[0]) : '/placeholder-image.jpg'}
                      alt={item.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Rating Badge */}
                    <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1 flex items-center text-xs">
                      <span className="text-green-600 font-semibold">{mockData.rating}</span>
                      <FiStar className="w-3 h-3 ml-1 text-green-600 fill-current" />
                      <span className="text-gray-600 ml-1">| {formatReviews(mockData.reviews)}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    {/* Brand Name */}
                    <div className="text-xs text-gray-500 uppercase font-medium mb-1">
                      {item.brand || 'BRAND'}
                    </div>
                    
                    {/* Product Name */}
                    <h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-tight">
                      {item.productName}
                    </h4>
                    
                    {/* Price Container */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            AED {item.price}
                          </span>
                        </div>
                        <span className="text-xs text-orange-500 font-medium">
                          ({item.discount}% OFF)
                        </span>
                      </div>
                      
                      {/* Bookmark Icon */}
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <FiBookmark className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PartyWearsPage;
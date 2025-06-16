import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import FooterSection from "./FotterSection";
import { useProductStore } from "../store/product";
import { useCartStore } from "../store/cart";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();
  const { addToCart, loading: cartLoading } = useCartStore();

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizeType, setSelectedSizeType] = useState('indian');
  const [cartMessage, setCartMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true";
      const userData = localStorage.getItem("userData");
      
      if (isAuth && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          // Clear invalid data
          localStorage.removeItem("userData");
          localStorage.removeItem("isAuthenticated");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Listen for login events
    const handleUserLogin = (event) => {
      setUser(event.detail);
      setIsAuthenticated(true);
    };

    window.addEventListener('userLogin', handleUserLogin);
    return () => window.removeEventListener('userLogin', handleUserLogin);
  }, []);

  // Load item
  useEffect(() => {
    const loadProduct = async () => {
      if (!products || products.length === 0) await fetchProducts();
      const found = products.find((p) => p._id === id);
      setItem(found);
    };
    loadProduct();
  }, [id, products]);

  // Reset cart message after 3 seconds
  useEffect(() => {
    if (cartMessage) {
      const timer = setTimeout(() => setCartMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [cartMessage]);

  const startDrag = (e) => {
    setIsDragging(true);
    const x = e.pageX || e.touches?.[0]?.pageX || 0;
    setStartX(x - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };


  // Enhanced size variant extraction
  const getAvailableSizes = () => {
    if (!item?.sizeVariants) return { indian: [], pakistan: [], hasSizes: false };
    
    const indianSizes = item.sizeVariants.indian || [];
    const pakistanSizes = item.sizeVariants.pakistan || [];
    
    // For demo purposes, if arrays are empty, add some sample sizes
    const demoIndianSizes = indianSizes.length > 0 ? indianSizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const demoPakistanSizes = pakistanSizes.length > 0 ? pakistanSizes : ['Small', 'Medium', 'Large', 'Extra Large'];
    
    return {
      indian: demoIndianSizes,
      pakistan: demoPakistanSizes,
      hasSizes: demoIndianSizes.length > 0 || demoPakistanSizes.length > 0
    };
  };

  const handleAddToCart = async () => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      setCartMessage('Please login to add items to cart.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    const sizeInfo = getAvailableSizes();
    
    if (sizeInfo.hasSizes && !selectedSize) {
      setCartMessage('Please select a size before adding to cart.');
      return;
    }
    
    if (item.colorVariants && item.colorVariants.length > 0 && !selectedColor) {
      setCartMessage('Please select a color before adding to cart.');
      return;
    }
    
    const cartItem = {
      _id: item._id,
      quantity,
      selectedSize: selectedSize ? `${selectedSizeType.toUpperCase()}: ${selectedSize}` : null,
      selectedColor,
      selectedSizeType,
    };
    
    try {
      await addToCart(user.id, cartItem);
      setCartMessage('✓ Added to cart successfully!');
    } catch (error) {
      console.error('Add to cart error:', error);
      setCartMessage(error.message || 'Failed to add item to cart');
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated || !user) {
      setCartMessage('Please login to continue with purchase.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
  
    const sizeInfo = getAvailableSizes();
  
    if (sizeInfo.hasSizes && !selectedSize) {
      setCartMessage('Please select a size before proceeding.');
      return;
    }
  
    if (item.colorVariants && item.colorVariants.length > 0 && !selectedColor) {
      setCartMessage('Please select a color before proceeding.');
      return;
    }
  
    // Build the cartItems array for this single product
    const cartItems = [
      {
        name: item.name,
        image: item.image,
        price: item.price,
        quantity,
        selectedSize: selectedSize ? `${selectedSizeType.toUpperCase()}: ${selectedSize}` : null,
        selectedColor
      }
    ];
  
    const totalAmount = item.price * quantity;
  
    navigate(`/payment-details/${item._id}`, {
      state: {
        userId: user.id,
        totalAmount,
        cartItems
      }
    });
  };
  
  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading product...</h1>
        </div>
      </div>
    );
  }

  const sizeInfo = getAvailableSizes();
  const colors = item.colorVariants || [];
  const discountedPrice = item.price ? item.price - (item.price * item.discount) / 100 : 0;
  const productImages = item.images || [];
  const currentSizes = sizeInfo[selectedSizeType] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cart Message Toast */}
      {cartMessage && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          cartMessage.includes('✓') 
            ? 'bg-green-500 text-white' 
            : cartMessage.includes('login') || cartMessage.includes('Please login')
            ? 'bg-blue-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          {cartMessage}
        </div>
      )}

      {/* Authentication Status Bar */}
      <div className="bg-gray-100 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div>
            {isAuthenticated && user ? (
              <span className="text-green-600">
                Welcome, {user.emailId}
              </span>
            ) : (
              <span className="text-gray-600">
                <button 
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Login
                </button> to add items to cart
              </span>
            )}
          </div>
          
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
            
            {/* Image Gallery Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                <img
                  src={productImages.length ? buildImageUrl(productImages[selectedImageIndex]) : '/placeholder-image.jpg'}
                  alt={item.productName}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.discount}% OFF
                  </div>
                )}
                {item.stockQuantity < 5 && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Only {item.stockQuantity} left!
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {productImages.length > 1 && (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square w-16 sm:w-20 md:w-24 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                        selectedImageIndex === index 
                          ? 'border-pink-500 ring-2 ring-pink-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={buildImageUrl(image)}
                        alt={`${item.productName} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{item.productName}</h1>
                <div className="flex items-center gap-3 text-lg mb-2">
                  {item.discount > 0 && (
                    <span className="text-gray-500 line-through">AED {item.price}</span>
                  )}
                  <span className="text-2xl font-bold text-red-600">AED {discountedPrice.toFixed(2)}</span>
                  {item.discount > 0 && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      Save AED {(item.price - discountedPrice).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">SKU: {item.sku}</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">{item.category}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 leading-relaxed">{item.productDescription}</p>
                {item.shortDescription && item.shortDescription !== item.productDescription && (
                  <p className="text-gray-500 mt-2 text-sm">{item.shortDescription}</p>
                )}
              </div>

              {/* Size Selection with Type Toggle */}
              {sizeInfo.hasSizes && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Size:</h3>
                  
                  {/* Size Type Toggle */}
                  <div className="flex gap-2 mb-3">
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        selectedSizeType === 'indian'
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        setSelectedSizeType('indian');
                        setSelectedSize(null);
                      }}
                    >
                      Indian Sizes
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        selectedSizeType === 'pakistan'
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        setSelectedSizeType('pakistan');
                        setSelectedSize(null);
                      }}
                    >
                      Pakistan Sizes
                    </button>
                  </div>

                  {/* Size Options */}
                  <div className="flex flex-wrap gap-2">
                    {currentSizes.map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedSize === size 
                            ? "bg-black text-white border-black shadow-md" 
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  
                  {selectedSize && (
                    <p className="text-sm text-gray-600">
                      Selected: {selectedSizeType.toUpperCase()} - {selectedSize}
                    </p>
                  )}
                </div>
              )}

              {/* Color Selection */}
              {colors.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Color:</h3>
                  <div className="flex gap-3 flex-wrap">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedColor === color 
                            ? "border-black ring-2 ring-gray-300 bg-gray-50" 
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                        <span className="capitalize">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Quantity:</h3>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center border-x border-gray-300 font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(item.stockQuantity, quantity + 1))} 
                    className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                    disabled={quantity >= item.stockQuantity}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Maximum available: {item.stockQuantity} units
                </p>
              </div>

              {/* Product Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">Product Details:</h3>
                {item.brand && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand:</span>
                    <span className="font-medium">{item.brand}</span>
                  </div>
                )}
                {item.material?.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium">{item.material.join(', ')}</span>
                  </div>
                )}
                {item.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{item.weight}</span>
                  </div>
                )}
                {item.deliveryTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-medium">{item.deliveryTime}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock Status:</span>
                  <span className={`font-medium ${item.stockQuantity > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                    {item.stockQuantity > 5 ? 'In Stock' : `Only ${item.stockQuantity} left`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleBuyNow}
                  disabled={item.stockQuantity === 0}
                >
                  {item.stockQuantity === 0 ? 'Out of Stock' : 'Buy Now'}
                </button>
                <button
                  className="w-full bg-pink-100 hover:bg-pink-200 text-pink-800 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 border border-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddToCart}
                  disabled={item.stockQuantity === 0 || cartLoading}
                >
                  {cartLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-800"></div>
                      Adding...
                    </div>
                  ) : item.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>

              {/* Care Instructions */}
              {item.careInstructions && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Care Instructions:</h3>
                  <p className="text-gray-600 text-sm">{item.careInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default ProductDetailsPage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  
  const { 
    cart, 
    itemCount, 
    totalAmount, 
    loading, 
    error,
    fetchCart, 
    updateCartItem, 
    removeFromCart, 
    clearCart 
  } = useCartStore();

  // Replace mock user ID with actual user ID from localStorage
  const [userId, setUserId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    const userData = localStorage.getItem("userData");

    if (isAuth && userData) {
      try {
        const user = JSON.parse(userData);
        if (user?.id) {
          setUserId(user.id);
        }
      } catch (err) {
        console.error("Failed to parse userData:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("Calling fetchCart for user:", userId);
      fetchCart(userId);
    }
  }, [fetchCart, userId]);

  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  const handleQuantityUpdate = async (itemId, newQuantity) => {
    try {
      await updateCartItem(userId, itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(userId, itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(userId);
      setShowClearConfirm(false);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/payment-details/', {
      state: {
        userId,
        totalAmount,
        cartItems: cart.items.map(item => ({
          name: item.productId?.productName,
          price: item.productId?.price - (item.productId?.price * item.productId?.discount) / 100,
          image: item.productId?.images?.[0]
            ? buildImageUrl(item.productId.images[0])
            : '/placeholder-image.jpg',
          size: item.selectedSize || 'N/A',
          color: item.selectedColor || 'N/A',
          quantity: item.quantity
        }))
      }
    });
    
  };
  

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading user info...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading cart...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">Error loading cart</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchCart(userId)}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          {cart.items.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => {
                const product = item.productId;
                const discountedPrice = product.price - (product.price * product.discount) / 100;
                const itemTotal = discountedPrice * item.quantity;

                return (
                  <div key={item._id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={product.images?.length ? buildImageUrl(product.images[0]) : '/placeholder-image.jpg'}
                          alt={product.productName}
                          className="w-full sm:w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div className="mb-2 sm:mb-0">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {product.productName}
                            </h3>
                            <div className="text-sm text-gray-600 space-y-1">
                              {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                              {item.selectedColor && <p>Color: <span className="capitalize">{item.selectedColor}</span></p>}
                              <p>SKU: {product.sku}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 sm:justify-end">
                              {product.discount > 0 && (
                                <span className="text-sm text-gray-500 line-through">
                                  AED {product.price}
                                </span>
                              )}
                              <span className="font-semibold text-red-600">
                                AED {discountedPrice.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Total: AED {itemTotal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityUpdate(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || loading}
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityUpdate(item._id, item.quantity + 1)}
                              disabled={item.quantity >= product.stockQuantity || loading}
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            disabled={loading}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                        {product.stockQuantity < 5 && (
                          <p className="text-orange-600 text-sm mt-2">
                            Only {product.stockQuantity} left in stock!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({itemCount})</span>
                    <span className="font-medium">AED {totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-red-600">AED {totalAmount}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}

        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Cart</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to remove all items from your cart? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCart}
                  disabled={loading}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Clearing...' : 'Clear Cart'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

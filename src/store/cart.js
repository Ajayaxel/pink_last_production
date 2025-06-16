import { create } from 'zustand';

const API_BASE_URL = 'https://backend.pinkstories.ae/api';

export const useCartStore = create((set, get) => ({
  cart: { items: [] },
  itemCount: 0,
  totalAmount: 0,
  loading: false,
  error: null,

  // Add item to cart
  addToCart: async (userId, productData) => {
    set({ loading: true, error: null });
    
    try {
      // Validate input data
      if (!userId) {
        throw new Error('User ID is required');
      }
      
      if (!productData || !productData._id) {
        throw new Error('Product data is invalid');
      }

      const requestBody = {
        userId,
        productId: productData._id,
        quantity: productData.quantity || 1,
        selectedSize: productData.selectedSize || null,
        selectedColor: productData.selectedColor || null,
        selectedSizeType: productData.selectedSizeType || null,
      };

      console.log('Sending cart request:', requestBody);

      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Cart response:', data);

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      // Update store state
      set({
        cart: data.cart || { items: [] },
        itemCount: data.itemCount || 0,
        totalAmount: data.totalAmount || 0,
        loading: false,
        error: null,
      });

      return data;
    } catch (error) {
      console.error('Add to cart error:', error);
      set({ 
        loading: false, 
        error: error.message || 'Failed to add item to cart'
      });
      throw error;
    }
  },

  // Get cart
  fetchCart: async (userId) => {
    if (!userId) {
      console.warn('fetchCart called without userId');
      return;
    }
  
    set({ loading: true, error: null });
  
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
      const data = await response.json();
      
  
      if (!response.ok) {
        throw new Error(data?.message || `Failed to fetch cart: ${response.status}`);
      }
  
      set({
        cart: data?.cart || { items: [] },
        itemCount: data?.itemCount || 0,
        totalAmount: parseFloat(data?.totalAmount) || 0,
        loading: false,
        error: null,
      });
  
      return data;
    } catch (error) {
      console.error('Fetch cart error:', error);
      set({ 
        loading: false, 
        error: error?.message || 'Failed to fetch cart',
      });
      throw error;
    }
  },
  

  // Update cart item quantity
  updateCartItem: async (userId, itemId, quantity) => {
    if (!userId || !itemId) {
      throw new Error('User ID and Item ID are required');
    }

    if (quantity < 1) {
      throw new Error('Quantity must be at least 1');
    }

    set({ loading: true, error: null });
    
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}/item/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: parseInt(quantity) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to update cart item: ${response.status}`);
      }

      set({
        cart: data.cart || { items: [] },
        itemCount: data.itemCount || 0,
        totalAmount: data.totalAmount || 0,
        loading: false,
        error: null,
      });

      return data;
    } catch (error) {
      console.error('Update cart item error:', error);
      set({ 
        loading: false, 
        error: error.message || 'Failed to update cart item'
      });
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (userId, itemId) => {
    if (!userId || !itemId) {
      throw new Error('User ID and Item ID are required');
    }

    set({ loading: true, error: null });
    
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}/item/${itemId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to remove item from cart: ${response.status}`);
      }

      set({
        cart: data.cart || { items: [] },
        itemCount: data.itemCount || 0,
        totalAmount: data.totalAmount || 0,
        loading: false,
        error: null,
      });

      return data;
    } catch (error) {
      console.error('Remove from cart error:', error);
      set({ 
        loading: false, 
        error: error.message || 'Failed to remove item from cart'
      });
      throw error;
    }
  },

  // Clear cart
  clearCart: async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    set({ loading: true, error: null });
    
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}/clear`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to clear cart: ${response.status}`);
      }

      set({
        cart: data.cart || { items: [] },
        itemCount: 0,
        totalAmount: 0,
        loading: false,
        error: null,
      });

      return data;
    } catch (error) {
      console.error('Clear cart error:', error);
      set({ 
        loading: false, 
        error: error.message || 'Failed to clear cart'
      });
      throw error;
    }
  },

  // Get cart item count (for header/navbar)
  getCartItemCount: () => {
    const { itemCount } = get();
    return itemCount || 0;
  },

  // Get total amount
  getTotalAmount: () => {
    const { totalAmount } = get();
    return totalAmount || 0;
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset cart state
  resetCart: () => set({
    cart: { items: [] },
    itemCount: 0,
    totalAmount: 0,
    loading: false,
    error: null,
  }),

  // Initialize cart for user (call this when user logs in)
  initializeCart: async (userId) => {
    if (!userId) return;
    
    try {
      await get().fetchCart(userId);
    } catch (error) {
      console.error('Failed to initialize cart:', error);
      // Don't throw error for initialization, just log it
    }
  },
}));
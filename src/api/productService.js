// productService.js - Specific service for product-related API calls

import apiService from './apiService.js';

class ProductService {
  // Fetch all products
  async getAllProducts() {
    try {
      const response = await apiService.get('products');
      return {
        success: true,
        data: response.data || [],
        count: response.count || 0,
        total: response.total || 0,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  // Fetch products with pagination
  async getProducts(page = 1, limit = 10) {
    try {
      const response = await apiService.get(`products?page=${page}&limit=${limit}`);
      return {
        success: true,
        data: response.data || [],
        count: response.count || 0,
        total: response.total || 0,
        currentPage: page,
        totalPages: Math.ceil((response.total || 0) / limit),
      };
    } catch (error) {
      console.error('Error fetching products with pagination:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  // Fetch single product by ID
  async getProductById(productId) {
    try {
      const response = await apiService.get(`products/${productId}`);
      return {
        success: true,
        data: response.data || response,
      };
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  // Fetch products by category
  async getProductsByCategory(category) {
    try {
      const response = await apiService.get(`products?category=${encodeURIComponent(category)}`);
      return {
        success: true,
        data: response.data || [],
        count: response.count || 0,
      };
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  // Fetch products by brand
  async getProductsByBrand(brand) {
    try {
      const response = await apiService.get(`products?brand=${encodeURIComponent(brand)}`);
      return {
        success: true,
        data: response.data || [],
        count: response.count || 0,
      };
    } catch (error) {
      console.error('Error fetching products by brand:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  // Search products
  async searchProducts(query) {
    try {
      const response = await apiService.get(`products/search?q=${encodeURIComponent(query)}`);
      return {
        success: true,
        data: response.data || [],
        count: response.count || 0,
      };
    } catch (error) {
      console.error('Error searching products:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  // Helper function to get full image URL
  getImageUrl(imagePath) {
    if (!imagePath) return '/placeholder-image.jpg';
    // Remove the /src part from the path since it's likely served differently
    const cleanPath = imagePath.replace('/src', '');
    return `http://localhost:7000${cleanPath}`;
  }

  // Helper function to calculate discounted price
  getDiscountedPrice(price, discount) {
    if (discount > 0) {
      return price - (price * discount / 100);
    }
    return price;
  }

  // Helper function to format price
  formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  // Helper function to check if product is new (within last 30 days)
  isNewProduct(dateAdded) {
    const productDate = new Date(dateAdded);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return productDate >= thirtyDaysAgo;
  }

  // Helper function to filter new arrivals
  getNewArrivals(products, limit = 3) {
    return products
      .filter(product => this.isNewProduct(product.dateAdded))
      .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
      .slice(0, limit);
  }

  // Helper function to filter products by category keywords
  getProductsByKeywords(products, keywords, limit = 3) {
    return products
      .filter(product => {
        const searchText = `${product.productName} ${product.category} ${product.shortDescription}`.toLowerCase();
        return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
      })
      .slice(0, limit);
  }

  // Get featured products (high stock or discounted items)
  getFeaturedProducts(products, limit = 3) {
    return products
      .filter(product => product.stockQuantity > 5 || product.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, limit);
  }
}

// Create a singleton instance
const productService = new ProductService();

// Export the instance
export default productService;

// Named export for the class
export { ProductService };
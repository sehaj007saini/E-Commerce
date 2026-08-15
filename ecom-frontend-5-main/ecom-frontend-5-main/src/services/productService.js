import API from '../axios';
import { handleApiError } from '../utils/errorHandler';

/**
 * Product Service
 * Handles all product-related API calls
 */
class ProductService {
  /**
   * Get all products
   */
  async getAllProducts() {
    try {
      const response = await API.get('/products');
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error, (msg) => console.error(msg));
      return { success: false, error: parsedError };
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(id) {
    try {
      const response = await API.get(`/product/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error);
      return { success: false, error: parsedError };
    }
  }

  /**
   * Get product image
   */
  async getProductImage(id) {
    try {
      const response = await API.get(`/product/${id}/image`, {
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);
      return { success: true, data: imageUrl };
    } catch (error) {
      console.error(`Error fetching image for product ${id}:`, error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create new product
   */
  async createProduct(productData, imageFile) {
    try {
      const formData = new FormData();
      
      if (imageFile) {
        formData.append('imageFile', imageFile);
      }
      
      formData.append(
        'product',
        new Blob([JSON.stringify(productData)], { type: 'application/json' })
      );

      const response = await API.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error);
      return { success: false, error: parsedError };
    }
  }

  /**
   * Update existing product
   */
  async updateProduct(id, productData, imageFile) {
    try {
      const formData = new FormData();
      
      if (imageFile) {
        formData.append('imageFile', imageFile);
      }
      
      formData.append(
        'product',
        new Blob([JSON.stringify(productData)], { type: 'application/json' })
      );

      const response = await API.put(`/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error);
      return { success: false, error: parsedError };
    }
  }

  /**
   * Delete product
   */
  async deleteProduct(id) {
    try {
      await API.delete(`/product/${id}`);
      return { success: true };
    } catch (error) {
      const parsedError = handleApiError(error);
      return { success: false, error: parsedError };
    }
  }

  /**
   * Search products by keyword
   */
  async searchProducts(keyword) {
    try {
      const response = await API.get(`/products/search?keyword=${encodeURIComponent(keyword)}`);
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error, (msg) => console.error(msg));
      return { success: false, error: parsedError };
    }
  }
}

export default new ProductService();

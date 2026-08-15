import API from '../axios';
import { handleApiError } from '../utils/errorHandler';

/**
 * Order Service
 * Handles all order-related API calls
 */
class OrderService {
  /**
   * Place a new order
   */
  async placeOrder(orderData) {
    try {
      const response = await API.post('/orders/place', orderData);
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error);
      return { success: false, error: parsedError };
    }
  }

  /**
   * Get all orders
   */
  async getAllOrders() {
    try {
      const response = await API.get('/orders');
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error);
      return { success: false, error: parsedError };
    }
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId) {
    try {
      const response = await API.get(`/orders/${orderId}`);
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error);
      return { success: false, error: parsedError };
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId, status) {
    try {
      const response = await API.patch(`/orders/${orderId}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error);
      return { success: false, error: parsedError };
    }
  }

  /**
   * Cancel order
   */
  async cancelOrder(orderId) {
    try {
      const response = await API.delete(`/orders/${orderId}/cancel`);
      return { success: true, data: response.data };
    } catch (error) {
      const parsedError = handleApiError(error);
      return { success: false, error: parsedError };
    }
  }
}

export default new OrderService();

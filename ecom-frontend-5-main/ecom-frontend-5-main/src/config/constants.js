// Application constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'E-Commerce Store',
  maxCartItems: parseInt(import.meta.env.VITE_MAX_CART_ITEMS) || 99,
  imagePlaceholder: import.meta.env.VITE_IMAGE_PLACEHOLDER || '/placeholder.png'
};

export const CATEGORIES = [
  'Laptop',
  'Headphone',
  'Mobile',
  'Electronics',
  'Toys',
  'Fashion'
];

export const ORDER_STATUS = {
  PLACED: 'PLACED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  PAYLOAD_TOO_LARGE: 413,
  SERVER_ERROR: 500
};

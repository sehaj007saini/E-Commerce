/**
 * Validate product data before submission
 * @param {Object} product - Product data
 * @returns {Object} { isValid, errors }
 */
export const validateProduct = (product) => {
  const errors = {};

  // Name validation (2-100 characters)
  if (!product.name || product.name.trim().length < 2) {
    errors.name = 'Product name must be at least 2 characters';
  } else if (product.name.length > 100) {
    errors.name = 'Product name must not exceed 100 characters';
  }

  // Brand validation
  if (!product.brand || product.brand.trim().length < 1) {
    errors.brand = 'Brand is required';
  }

  // Description validation
  if (!product.description || product.description.trim().length < 5) {
    errors.description = 'Description must be at least 5 characters';
  }

  // Price validation
  const price = parseFloat(product.price);
  if (isNaN(price) || price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  // Stock quantity validation
  const stock = parseInt(product.stockQuantity);
  if (isNaN(stock) || stock < 0) {
    errors.stockQuantity = 'Stock quantity must be 0 or greater';
  }

  // Category validation
  if (!product.category || product.category.trim().length === 0) {
    errors.category = 'Please select a category';
  }

  // Release date validation
  if (!product.releaseDate) {
    errors.releaseDate = 'Release date is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate image file
 * @param {File} file - Image file
 * @returns {Object} { isValid, error }
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { isValid: false, error: 'Please select an image file' };
  }

  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Please upload JPEG, PNG, GIF, or WebP image'
    };
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size exceeds 10MB limit'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate order data
 * @param {Object} orderData - Order information
 * @returns {Object} { isValid, errors }
 */
export const validateOrder = (orderData) => {
  const errors = {};

  // Customer name validation
  if (!orderData.customerName || orderData.customerName.trim().length < 2) {
    errors.customerName = 'Customer name must be at least 2 characters';
  }

  // Email validation
  if (!orderData.customerEmail || !validateEmail(orderData.customerEmail)) {
    errors.customerEmail = 'Please enter a valid email address';
  }

  // Shipping address validation
  if (!orderData.shippingAddress || orderData.shippingAddress.trim().length < 10) {
    errors.shippingAddress = 'Shipping address must be at least 10 characters';
  }

  // Items validation
  if (!orderData.items || orderData.items.length === 0) {
    errors.items = 'Cart is empty';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sanitize string input
 * @param {string} input - Input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

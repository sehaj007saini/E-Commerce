import { HTTP_STATUS } from '../config/constants';

/**
 * Parse error response from API
 * @param {Error} error - Axios error object
 * @returns {Object} Parsed error details
 */
export const parseError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    return {
      status,
      message: data.message || data.error || 'An error occurred',
      timestamp: data.timestamp,
      path: data.path,
      details: data.details || data.errors || null
    };
  } else if (error.request) {
    // Request made but no response
    return {
      status: 0,
      message: 'Unable to connect to server. Please check your internet connection.',
      timestamp: new Date().toISOString(),
      path: null,
      details: null
    };
  } else {
    // Error in request setup
    return {
      status: 0,
      message: error.message || 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
      path: null,
      details: null
    };
  }
};

/**
 * Display user-friendly error message
 * @param {Object} error - Parsed error object
 * @returns {string} User-friendly message
 */
export const getUserFriendlyMessage = (error) => {
  const { status, message } = error;

  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
      return message || 'Invalid request. Please check your input.';
    case HTTP_STATUS.NOT_FOUND:
      return message || 'The requested resource was not found.';
    case HTTP_STATUS.CONFLICT:
      return message || 'This action conflicts with existing data.';
    case HTTP_STATUS.PAYLOAD_TOO_LARGE:
      return 'File size is too large. Maximum size is 10MB.';
    case HTTP_STATUS.SERVER_ERROR:
      return 'Server error. Please try again later.';
    case 0:
      return message;
    default:
      return message || 'An unexpected error occurred.';
  }
};

/**
 * Format validation errors
 * @param {Array|Object} errors - Validation errors from backend
 * @returns {string} Formatted error message
 */
export const formatValidationErrors = (errors) => {
  if (!errors) return '';
  
  if (Array.isArray(errors)) {
    return errors.map(err => `• ${err.field}: ${err.message}`).join('\n');
  }
  
  if (typeof errors === 'object') {
    return Object.entries(errors)
      .map(([field, message]) => `• ${field}: ${message}`)
      .join('\n');
  }
  
  return errors.toString();
};

/**
 * Handle API error and show user notification
 * @param {Error} error - Axios error
 * @param {Function} notificationFn - Function to show notification (e.g., alert, toast)
 */
export const handleApiError = (error, notificationFn = alert) => {
  const parsedError = parseError(error);
  let message = getUserFriendlyMessage(parsedError);
  
  if (parsedError.details) {
    const validationErrors = formatValidationErrors(parsedError.details);
    if (validationErrors) {
      message += '\n\n' + validationErrors;
    }
  }
  
  notificationFn(message);
  
  // Log to console for debugging
  console.error('API Error:', {
    status: parsedError.status,
    message: parsedError.message,
    path: parsedError.path,
    timestamp: parsedError.timestamp,
    details: parsedError.details
  });
  
  return parsedError;
};

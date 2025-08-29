//   src\utils\errorHandler.js
//   helper functions for error handling

/**
 * handles API errors and maps them to user-friendly messages
 * logs the error to the console
 * 
 * @param {Error} error - Error object from API call
 * @returns {string} - User-friendly error message
 */
export const apiErrorHandler = (error) => {
  console.error('API Error:', error);
  
  // map specific error messages

  if (error.message.includes('400')) {
    return 'Invalid date format provided';
  }
  if (error.message.includes('404')) {
    return 'API endpoint not found';
  }
  if (error.message.includes('5')) {
    return 'Server error, please try again later';
  }
  
  // default message for unexpected errors
  return 'An unexpected error occurred';
};

/**
 * logs error details to the console in development mode 
 * logs additional error info if any
 * 
 * @param {Error} error - Error object
 * @param {Object|null} errorInfo - Optional additional error info
 */
export const logError = (error, errorInfo = null) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    if (errorInfo) {
      console.error('Error Info:', errorInfo);
    }
  }
};
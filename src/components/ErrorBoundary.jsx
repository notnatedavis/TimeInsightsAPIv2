//   src\components\ErrorBoundary.jsx
//   reusable components for Error Boundary

import React from 'react';

/**
 * Error Boundary component
 * catches JS errors anywhere in child component tree
 * displays fallback UI on error
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // tracks if an error has occurred and stores the error object
    this.state = { hasError: false, error: null };
  }

  /**
   * updates state so the next render shows the fallback UI
   * called when a child throws an error
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * logs error details for debugging
   * @param {*Error} error - the error object
   * @param {*Object} errorInfo - additional info about error
   */
  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // fall back UI shown when an error is caught
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2> {/* Display error message for debugging */}
          <p>{this.state.error.message}</p> {/* Reload button allows user to recover */}
          <button onClick={() => window.location.reload()}> 
            Reload Dashboard
          </button>
        </div>
      );
    }

    // render children if no error
    return this.props.children;
  }
}

// critical - must keep to allow importing in other files
export default ErrorBoundary;
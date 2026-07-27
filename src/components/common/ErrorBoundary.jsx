import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Akole Cafe ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5EFE3] dark:bg-[#121A15] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white dark:bg-[#1D2C22] p-8 rounded-3xl shadow-2xl border border-[#D6AE4D]/30 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D6AE4D]/20 text-[#D6AE4D] flex items-center justify-center mx-auto text-2xl font-bold">
              ☕
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#123524] dark:text-white">
              Akole Café Application Refreshed
            </h2>
            <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5]">
              {this.state.error?.message || 'Something updated in the background. Click below to reload cleanly.'}
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D6AE4D] to-[#B89035] text-[#123524] font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

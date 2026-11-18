import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[calc(100vh-140px)] bg-[#F7F9FC] flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-red-200 p-8 shadow-xs text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#202938]">
                Something went wrong
              </h2>
              <p className="text-xs text-[#667085] leading-relaxed">
                The portal encountered an unexpected display issue. Your saved preferences and selections are safe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#2457A6] hover:bg-[#1A4280] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#E5EAF0] hover:bg-[#F7F9FC] text-[#202938] text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

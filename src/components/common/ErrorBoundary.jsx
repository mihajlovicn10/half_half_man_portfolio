import PropTypes from 'prop-types';
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
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.assign('/');
  };

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (!hasError) return children;

    const isDev = Boolean(import.meta?.env?.DEV);

    return (
      <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-2 text-white/80">
            Please try again. If this keeps happening, refresh the page or go back to the home page.
          </p>

          {isDev && error?.message && (
            <div className="mt-4 rounded-lg bg-black/40 p-3 text-sm font-mono text-white/80 overflow-auto">
              {error.message}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-md bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:bg-white/90"
              onClick={this.handleReload}
            >
              Reload
            </button>
            <button
              type="button"
              className="rounded-md bg-white/10 text-white px-4 py-2 text-sm font-medium hover:bg-white/15 border border-white/10"
              onClick={this.handleGoHome}
            >
              Go home
            </button>
            <button
              type="button"
              className="rounded-md bg-transparent text-white/80 px-4 py-2 text-sm font-medium hover:text-white"
              onClick={this.handleReset}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;


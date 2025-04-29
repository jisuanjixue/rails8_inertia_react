import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch JavaScript errors anywhere in the child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="p-6 mx-auto my-8 bg-red-50 rounded-lg shadow-md max-w-2xl border border-red-200">
          <h2 className="mb-4 text-xl font-bold text-red-700">Something went wrong</h2>
          <p className="mb-4 text-red-600">
            The application encountered an error. Please try refreshing the page.
          </p>
          {this.state.error && (
            <div className="p-3 mt-4 overflow-auto text-sm bg-white rounded border border-red-100 max-h-48">
              <p className="font-mono text-red-800">{this.state.error.toString()}</p>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

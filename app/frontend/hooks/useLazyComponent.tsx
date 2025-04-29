import React, { lazy, Suspense, ComponentType } from 'react'

// Loading fallback component
const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px]">
    <div className="w-12 h-12 border-4 border-t-4 rounded-full border-neutral-700 border-t-blue-500 animate-spin"></div>
  </div>
)

// Error fallback component
const DefaultErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="p-4 mx-auto my-4 text-center bg-red-50 rounded-lg max-w-md">
    <h3 className="mb-2 text-lg font-medium text-red-800">加载组件时出错</h3>
    <p className="mb-4 text-sm text-red-600">{error.message}</p>
    <button
      onClick={retry}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      重试
    </button>
  </div>
)

interface UseLazyComponentOptions {
  LoadingFallback?: React.ComponentType
  ErrorFallback?: React.ComponentType<{ error: Error; retry: () => void }>
  suspenseFallback?: React.ReactNode
  errorBoundary?: boolean
}

/**
 * Custom hook for lazy loading components with Suspense and error handling
 * 
 * @param importFn - Dynamic import function for the component
 * @param options - Configuration options
 * @returns A lazy-loaded component with Suspense and error handling
 */
export function useLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: UseLazyComponentOptions = {}
): React.ComponentType<React.ComponentProps<T>> {
  const {
    LoadingFallback = DefaultLoadingFallback,
    ErrorFallback = DefaultErrorFallback,
    suspenseFallback = <LoadingFallback />,
    errorBoundary = true
  } = options

  // Create a lazy component with error handling
  const LazyComponent = lazy(() => {
    return importFn().catch((error) => {
      console.error('Error loading component:', error)
      // Return a minimal component that will render the error fallback
      return {
        default: (props: any) => <ErrorFallback error={error} retry={() => window.location.reload()} />
      } as { default: T }
    })
  })

  // Return a component that wraps the lazy component with Suspense
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={suspenseFallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export default useLazyComponent

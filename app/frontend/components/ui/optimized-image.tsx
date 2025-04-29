import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import useOptimizedImage from '@/hooks/useOptimizedImage'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: number
  className?: string
  containerClassName?: string
  blurEffect?: boolean
  lazyLoad?: boolean
  fallbackSrc?: string
  onLoad?: () => void
  onError?: () => void
}

/**
 * OptimizedImage component that provides:
 * - Lazy loading
 * - Blur-up loading effect
 * - Image optimization
 * - Fallback image support
 * - Loading state
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  className,
  containerClassName,
  blurEffect = true,
  lazyLoad = true,
  fallbackSrc,
  onLoad,
  onError,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Use our custom hook for image optimization
  const {
    src: optimizedSrc,
    placeholderSrc,
    isLoading,
    error: imageError
  } = useOptimizedImage(src, {
    width,
    height,
    quality,
    blur: blurEffect,
    lazyLoad
  })

  // Handle image load event
  const handleLoad = () => {
    setLoaded(true)
    onLoad?.()
  }

  // Handle image error event
  const handleError = () => {
    setError(true)
    onError?.()
  }

  // Reset states when src changes
  useEffect(() => {
    setLoaded(false)
    setError(false)
  }, [src])

  // Determine which source to use
  const imageSrc = error && fallbackSrc ? fallbackSrc : optimizedSrc || placeholderSrc

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={{ width, height }}
    >
      {/* Blur placeholder while loading */}
      {blurEffect && placeholderSrc && !loaded && (
        <img
          src={placeholderSrc}
          alt={alt}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            'filter blur-lg scale-105',
            loaded ? 'opacity-0' : 'opacity-100'
          )}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      )}

      {/* Loading indicator */}
      {isLoading && !loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {(error || imageError) && !fallbackSrc && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-10 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-sm">图片加载失败</span>
        </div>
      )}
    </div>
  )
}

export default OptimizedImage

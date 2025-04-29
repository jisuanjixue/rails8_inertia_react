import { useState, useEffect } from 'react'

interface UseOptimizedImageOptions {
  width?: number
  height?: number
  quality?: number
  blur?: boolean
  lazyLoad?: boolean
}

/**
 * Custom hook for optimizing images with lazy loading and blur-up technique
 * 
 * @param src - The source URL of the image
 * @param options - Configuration options for image optimization
 * @returns An object containing the optimized image URL and loading state
 */
export function useOptimizedImage(
  src: string | null | undefined,
  options: UseOptimizedImageOptions = {}
) {
  const {
    width,
    height,
    quality = 80,
    blur = true,
    lazyLoad = true
  } = options

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null)
  const [placeholderSrc, setPlaceholderSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!src) {
      setIsLoading(false)
      setOptimizedSrc(null)
      setPlaceholderSrc(null)
      return
    }

    setIsLoading(true)
    setError(null)

    // Create a tiny placeholder for blur-up effect
    if (blur) {
      // This would typically call an image processing service
      // For now, we'll just simulate it with a smaller version
      const tinyPlaceholder = `${src}?w=20&q=10`
      setPlaceholderSrc(tinyPlaceholder)
    }

    // Build the optimized image URL with query parameters
    let optimizedUrl = src
    const params = new URLSearchParams()
    
    if (width) params.append('w', width.toString())
    if (height) params.append('h', height.toString())
    if (quality) params.append('q', quality.toString())
    
    if (params.toString()) {
      optimizedUrl = `${src}?${params.toString()}`
    }

    // Simulate image loading
    const img = new Image()
    
    img.onload = () => {
      setOptimizedSrc(optimizedUrl)
      setIsLoading(false)
    }
    
    img.onerror = (e) => {
      setError(new Error('Failed to load image'))
      setIsLoading(false)
      console.error('Image loading error:', e)
    }
    
    if (lazyLoad) {
      // Use Intersection Observer for lazy loading
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          img.src = optimizedUrl
          observer.disconnect()
        }
      })
      
      // Create a dummy element to observe
      const dummyEl = document.createElement('div')
      document.body.appendChild(dummyEl)
      observer.observe(dummyEl)
      
      return () => {
        observer.disconnect()
        document.body.removeChild(dummyEl)
      }
    } else {
      // Load immediately if lazy loading is disabled
      img.src = optimizedUrl
    }
  }, [src, width, height, quality, blur, lazyLoad])

  return {
    src: optimizedSrc,
    placeholderSrc,
    isLoading,
    error
  }
}

export default useOptimizedImage

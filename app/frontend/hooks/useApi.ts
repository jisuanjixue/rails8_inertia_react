import { useState, useCallback } from 'react'
import { toast } from '@/hooks/use-toast'

interface UseApiOptions {
  showSuccessToast?: boolean
  showErrorToast?: boolean
  successMessage?: string
  errorMessage?: string
}

interface ApiResponse<T> {
  data: T | null
  loading: boolean
  error: Error | null
  execute: (...args: any[]) => Promise<T | null>
  reset: () => void
}

/**
 * Custom hook for handling API requests with loading, error states and toast notifications
 * 
 * @param apiFunction - The API function to call
 * @param options - Configuration options
 * @returns An object with data, loading, error states and execute function
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
): ApiResponse<T> {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = '操作成功',
    errorMessage = '操作失败'
  } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
  }, [])

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      try {
        setLoading(true)
        setError(null)

        const result = await apiFunction(...args)
        
        setData(result)
        
        if (showSuccessToast) {
          toast({
            title: '成功',
            description: successMessage,
            variant: 'default'
          })
        }
        
        return result
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        setError(errorObj)
        
        if (showErrorToast) {
          toast({
            title: '错误',
            description: errorMessage || errorObj.message,
            variant: 'destructive'
          })
        }
        
        return null
      } finally {
        setLoading(false)
      }
    },
    [apiFunction, showSuccessToast, showErrorToast, successMessage, errorMessage]
  )

  return { data, loading, error, execute, reset }
}

export default useApi

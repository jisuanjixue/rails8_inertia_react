import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for using localStorage with automatic JSON serialization/deserialization
 * 
 * @param key - The localStorage key
 * @param initialValue - The initial value if the key doesn't exist in localStorage
 * @returns A stateful value and a function to update it
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }, [initialValue, key])

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      // Prevent build error "window is undefined" but keep working
      if (typeof window === 'undefined') {
        console.warn(
          `Tried setting localStorage key "${key}" even though environment is not a client`
        )
      }

      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        
        // Save state
        setStoredValue(valueToStore)
        
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        
        // Dispatch a custom event so other instances can update
        window.dispatchEvent(new Event('local-storage'))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Remove from local storage
  const removeValue = useCallback(() => {
    try {
      // Remove from local storage
      window.localStorage.removeItem(key)
      
      // Reset state to initial value
      setStoredValue(initialValue)
      
      // Dispatch a custom event so other instances can update
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [initialValue, key])

  // Listen for changes to this localStorage key from other instances
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }
    
    // Listen for the custom event
    window.addEventListener('local-storage', handleStorageChange)
    
    // Listen for the storage event (triggered by other documents)
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('local-storage', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [readValue])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage

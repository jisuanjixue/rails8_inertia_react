import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names with Tailwind CSS support
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks if a value is of a specific type
 * @param data - The value to check
 * @param type - The expected type
 * @returns boolean indicating if the value matches the expected type
 */
export const isType = <T>(data: T, type: string): boolean => {
  const typeObj = {
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Function]': 'function',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object HTMLDivElement]': 'dom',
    '[object WeakMap]': 'weakMap',
    '[object Window]': 'window',
    '[object Error]': 'error',
    '[object Arguments]': 'arguments',
    '[object Promise]': 'promise',
    '[object Symbol]': 'symbol'
  }

  const name = Object.prototype.toString.call(data)
  const typeName = typeObj[name] || '未知类型'
  return typeName === type
}

/**
 * Converts an array to query parameters for API requests
 */
export const convertToQueryParams = <T extends Record<string, any>>(obj: T | undefined): Record<string, any> | undefined => {
  if (!obj || isType(obj, 'undefined')) {
    return undefined
  }

  const result: Record<string, any> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined && obj[key] !== null) {
      result[`${key}_cont`] = obj[key]
    }
  }

  return result
}

/**
 * Formats a date string to a localized format
 */
export const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options
    })
  } catch (error) {
    console.error('Date formatting error:', error)
    return dateString
  }
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (!str || str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}

/**
 * Debounces a function call
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttles a function call
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false

  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Safely access nested object properties
 */
export const getNestedValue = <T>(obj: any, path: string, defaultValue: T): T => {
  try {
    const keys = path.split('.')
    let current = obj

    for (const key of keys) {
      if (current === undefined || current === null) {
        return defaultValue
      }
      current = current[key]
    }

    return current === undefined || current === null ? defaultValue : current
  } catch (error) {
    console.error('Error accessing nested property:', error)
    return defaultValue
  }
}

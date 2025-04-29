import { useEffect, useCallback, useRef } from 'react'

type KeyHandler = (event: KeyboardEvent) => void
type KeyMap = Record<string, KeyHandler>

interface UseKeyboardShortcutOptions {
  preventDefault?: boolean
  stopPropagation?: boolean
  keyevent?: 'keydown' | 'keyup' | 'keypress'
  disabled?: boolean
}

/**
 * Custom hook for handling keyboard shortcuts
 * 
 * @param keyMap - Map of key combinations to handler functions
 * @param options - Configuration options
 */
export function useKeyboardShortcut(
  keyMap: KeyMap,
  options: UseKeyboardShortcutOptions = {}
): void {
  const {
    preventDefault = true,
    stopPropagation = true,
    keyevent = 'keydown',
    disabled = false
  } = options

  // Use a ref to store the keyMap to avoid unnecessary effect triggers
  const keyMapRef = useRef<KeyMap>(keyMap)
  
  // Update the ref when keyMap changes
  useEffect(() => {
    keyMapRef.current = keyMap
  }, [keyMap])

  // Event handler
  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return

      // Create a key identifier that includes modifiers
      const modifiers = []
      if (event.ctrlKey) modifiers.push('ctrl')
      if (event.altKey) modifiers.push('alt')
      if (event.shiftKey) modifiers.push('shift')
      if (event.metaKey) modifiers.push('meta')
      
      // Combine modifiers with the key
      const keyWithModifiers = [...modifiers, event.key.toLowerCase()].join('+')
      
      // Check if we have a handler for this key combination
      const handler = keyMapRef.current[keyWithModifiers] || keyMapRef.current[event.key.toLowerCase()]
      
      if (handler) {
        if (preventDefault) {
          event.preventDefault()
        }
        
        if (stopPropagation) {
          event.stopPropagation()
        }
        
        handler(event)
      }
    },
    [disabled, preventDefault, stopPropagation]
  )

  // Add and remove event listener
  useEffect(() => {
    if (!disabled) {
      window.addEventListener(keyevent, handleKeyEvent)
    }
    
    return () => {
      window.removeEventListener(keyevent, handleKeyEvent)
    }
  }, [keyevent, handleKeyEvent, disabled])
}

export default useKeyboardShortcut

import { useState, useCallback } from 'react'
import { ZodSchema, ZodError } from 'zod'
import { useForm as useInertiaForm } from '@inertiajs/react'
import { KeysWithStringValues } from '@/types/utilityTypes'

interface UseZodFormOptions<T extends object> {
  initialValues: T
  validationSchema: ZodSchema<T>
  submitUrl: string
  method?: 'post' | 'put' | 'patch' | 'delete'
  onSuccess?: (page: any) => void
  onError?: (errors: Record<string, string>) => void
  resetOnSuccess?: boolean
}

/**
 * Custom hook that combines Inertia form handling with Zod validation
 */
export function useZodForm<T extends object>({
  initialValues,
  validationSchema,
  submitUrl,
  method = 'post',
  onSuccess,
  onError,
  resetOnSuccess = false
}: UseZodFormOptions<T>) {
  // Use Inertia's form hook
  const form = useInertiaForm(initialValues)
  
  // Local validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  
  // Validate a single field
  const validateField = useCallback(
    (field: keyof T, value: any) => {
      try {
        // Create a partial schema for just this field
        const partialSchema = validationSchema.pick({ [field]: true })
        partialSchema.parse({ [field]: value })
        
        // Clear error for this field if validation passes
        setValidationErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[field as string]
          return newErrors
        })
        
        return true
      } catch (error) {
        if (error instanceof ZodError) {
          // Extract and set the validation error for this field
          const fieldError = error.errors.find(err => 
            err.path.includes(field as string)
          )
          
          if (fieldError) {
            setValidationErrors(prev => ({
              ...prev,
              [field as string]: fieldError.message
            }))
          }
        }
        
        return false
      }
    },
    [validationSchema]
  )
  
  // Validate all fields
  const validateForm = useCallback(() => {
    try {
      validationSchema.parse(form.data)
      setValidationErrors({})
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        // Convert Zod errors to a record of field -> message
        const errors = error.errors.reduce((acc, curr) => {
          const field = curr.path.join('.')
          acc[field] = curr.message
          return acc
        }, {} as Record<string, string>)
        
        setValidationErrors(errors)
        onError?.(errors)
      }
      
      return false
    }
  }, [form.data, validationSchema, onError])
  
  // Handle form submission
  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault()
      }
      
      // Validate form before submission
      if (!validateForm()) {
        return
      }
      
      // Submit the form using the appropriate Inertia method
      const submitOptions = {
        onSuccess: (page: any) => {
          if (resetOnSuccess) {
            form.reset()
          }
          onSuccess?.(page)
        },
        onError: (errors: Record<string, string>) => {
          setValidationErrors(prev => ({ ...prev, ...errors }))
          onError?.(errors)
        }
      }
      
      switch (method) {
        case 'post':
          form.post(submitUrl, submitOptions)
          break
        case 'put':
          form.put(submitUrl, submitOptions)
          break
        case 'patch':
          form.patch(submitUrl, submitOptions)
          break
        case 'delete':
          form.delete(submitUrl, submitOptions)
          break
      }
    },
    [form, method, onError, onSuccess, resetOnSuccess, submitUrl, validateForm]
  )
  
  // Update a field value with validation
  const updateField = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      form.setData(field, value)
      validateField(field, value)
    },
    [form, validateField]
  )
  
  // Get all errors (combining Inertia errors and Zod validation errors)
  const allErrors = {
    ...form.errors,
    ...validationErrors
  }
  
  return {
    data: form.data,
    setData: form.setData,
    errors: allErrors,
    processing: form.processing,
    updateField,
    validateField,
    validateForm,
    handleSubmit,
    reset: form.reset,
    transform: form.transform,
    clearErrors: form.clearErrors,
    setError: form.setError
  }
}

export default useZodForm

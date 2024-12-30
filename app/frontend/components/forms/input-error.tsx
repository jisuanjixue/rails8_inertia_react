import { AlertCircle } from 'lucide-react'
import { ReactElement } from 'react'

export default function InputError ({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <div className='flex items-center p-1 text-sm text-red-600'>
      <AlertCircle className='w-4 h-4 mr-1' />
      {children}
    </div>
  )
}

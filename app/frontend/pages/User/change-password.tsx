import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/forms/motion-label'
import { InputWithPasswordStrengthIndicator } from '@/components/forms/input-with-password-strength-indicator'

import LabelInputContainer from '@/components/ui/label-input-container'
import BottomGradient from '@/components/ui/bottom-gradient'

const ChangePassword = () => {
  const form = useForm({
    password_challenge: '',
    password: '',
    password_confirmation: ''
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    form.patch('/identity/change_password')
  }

  return (
    <form onSubmit={handleSubmit} className='contents'>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='password_challenge' className='text-left text-white'>
          旧密码
        </Label>
        <InputWithPasswordStrengthIndicator id='password_challenge' name='password_challenge' onChange={(value) => setData('password_challenge', value)} value={data.password_challenge} className='w-80' />
        {errors.password_challenge && (
          <div className='px-3 py-2 font-medium text-red-500'>
            {errors.password_challenge.join(', ')}
          </div>
        )}
      </LabelInputContainer>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='password' className='text-left text-white'>
          新密码
        </Label>
        <InputWithPasswordStrengthIndicator id='password' name='password' onChange={(value) => setData('password', value)} value={data.password} className='w-80' />
        <div className='px-3 py-2 font-medium text-red-500'>
          {errors.password && (
            <div className='px-3 py-2 font-medium text-red-500'>
              {errors.password.join(', ')}
            </div>
          )}
        </div>
      </LabelInputContainer>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='password_confirmation' className='text-left text-white'>
          密码确认
        </Label>
        <InputWithPasswordStrengthIndicator id='password_confirmation' name='password_confirmation' onChange={(value) => setData('password_confirmation', value)} value={data.password_confirmation} className='w-80' />
        {errors.password_confirmation && (
          <div className='px-3 py-2 font-medium text-red-500'>
            {errors.password_confirmation.join(', ')}
          </div>
        )}
      </LabelInputContainer>
      <Button
        variant='secondary'
        type='submit'
        disabled={processing}
      >修改密码
      </Button>
      <BottomGradient />
    </form>
  )
}

export default ChangePassword

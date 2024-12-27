import { useForm } from '@inertiajs/react'
import { Label } from '@/components/forms/motion-label'
import { Input } from '@/components/forms/motion-input'
import LabelInputContainer from '@/components/ui/label-input-container'
import { Button } from '@/components/ui/button'
import BottomGradient from '@/components/ui/bottom-gradient'

const useChangeEmail = ({ user }) => {
  const form = useForm({
    password_challenge: '',
    email: ''
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    form.transform((data) => (data))
    form.patch('/change_email')
  }

  const render = () => {
    return (
      <form onSubmit={handleSubmit} className='contents'>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='password_challenge' className='text-left'>
            密码
          </Label>
          <Input id='password_challenge' onChange={(e) => setData('password_challenge', e.target.value)} value={data.password_challenge} className='col-span-3' />
          {errors.password_challenge && (
            <div className='px-3 py-2 font-medium text-red-500'>
              {errors.password_challenge.join(', ')}
            </div>
          )}
        </LabelInputContainer>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='email' className='text-left'>
            新邮箱
          </Label>
          <Input id='email' onChange={(e) => setData('email', e.target.value)} value={data.email} className='col-span-2' />
          <div className='px-3 py-2 font-medium text-red-500'>
            {errors.email && (
              <div className='px-3 py-2 font-medium text-red-500'>
                {errors.email.join(', ')}
              </div>
            )}
          </div>
        </LabelInputContainer>
        <Button
          variant='secondary'
          type='submit'
          disabled={processing}
        >修改邮箱
        </Button>
        <BottomGradient />
      </form>
    )
  }

  return { render }
}

export default useChangeEmail

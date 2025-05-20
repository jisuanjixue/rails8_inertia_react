''
import React, { ReactElement } from 'react'
import { Label } from '@/components/forms/motion-label'
import { Input } from '@/components/forms/motion-input'
import { InputWithPasswordStrengthIndicator } from '@/components/forms/input-with-password-strength-indicator'
import LabelInputContainer from '@/components/ui/label-input-container'
import BottomGradient from '@/components/ui/bottom-gradient'
import {
  IconBrandGithub
} from '@tabler/icons-react'
import { router } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import useFormHandler from '@/hooks/useFormHandler'
import { KeysWithStringValues } from '@/types/utilityTypes'

interface LoginData {
  email: string
  password: string
}

const LoginForm = ({ is_developer }: { is_developer: boolean }) => {
  const redirect_to_path = new URLSearchParams(window.location.search).get('redirect_to') || '/'

  const {
    data,
    processing,
    updateField,
    submit,
    errors
  } = useFormHandler<LoginData>({
    initialData: {
      email: '',
      password: '',
    },
    postUrl: '/sign_in',
    onSuccess: () => {
    }
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit(e)
  }


  const renderTextInput =  (
    type: string,
    id: KeysWithStringValues<LoginData>,
    placeholder: string
  ): ReactElement  => {
    return (
      <Input id={id} placeholder={placeholder} type={type} name={id} value={data[id]} onChange={(e) => updateField(id, e.target.value)}  error={errors.email}/>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <div className={cn('w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-md border-2 border-gray-300', 'dark:bg-black dark:border-gray-700')}>
        <h2 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
          欢迎您的到来！
        </h2>
        <p className='max-w-sm mt-2 text-sm text-neutral-600 dark:text-neutral-300'>
          登录账号开始您的欢快之旅
        </p>

        <form className='my-8' onSubmit={handleSubmit}>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>电子邮箱</Label>
            {renderTextInput('email', 'email', 'projectmayhem@fc.com')}
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password'>密码</Label>
            <InputWithPasswordStrengthIndicator id='password' placeholder='••••••••' type='password' name='login_password' value={data.password} onChange={(value) => updateField('password', value)} error={errors.password} autoComplete='new-password' />
          </LabelInputContainer>

          <button
            className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            type='submit'
            disabled={processing}
          >
            登录 &rarr;
            <BottomGradient />
          </button>
          <div className='flex items-center text-sm font-light text-gray-500 dark:text-gray-400'>
            还没有账号? <div onClick={() => { router.get('/sign_up') }} className='ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500'>点击注册</div>
          </div>

          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

          <div className='flex flex-col space-y-4' onClick={() => { router.post(`/auth/github?redirect_to=${redirect_to_path}`) }}>
            <button
              className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
              type='button'
            >
              <IconBrandGithub className='w-4 h-4 text-neutral-800 dark:text-neutral-300' />
              <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                GitHub
              </span>
              <BottomGradient />
            </button>
          </div>
          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

          {is_developer && (
            <div className='flex flex-col space-y-4'>
              <button
                className='relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
                type='button'
                onClick={() => router.post('/auth/developer')}
              >
                <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                  用github登录 (开发环境)
                </span>
                <BottomGradient />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginForm

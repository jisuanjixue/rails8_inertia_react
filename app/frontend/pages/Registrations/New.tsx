''
import React, { ReactElement, useRef } from 'react'
import { Label } from '@/components/forms/motion-label'
import { Input } from '@/components/forms/motion-input'
import { InputWithPasswordStrengthIndicator } from '@/components/forms/input-with-password-strength-indicator'
import { cn } from '@/lib/utils'
import { router } from '@inertiajs/react'
import useFormHandler from '@/hooks/useFormHandler'
import { KeysWithStringValues } from '@/types/utilityTypes'
import LabelInputContainer from '@/components/ui/label-input-container'
import BottomGradient from '@/components/ui/bottom-gradient'
import ReCAPTCHA from 'react-google-recaptcha'

interface SignUpData {
  email: string
  password: string
  password_confirmation: string
  recaptcha_token: string
}

const SignUpForm = ({ user }: { user: SignUpData }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const {
    data,
    processing,
    updateField,
    submit,
    errors
  } = useFormHandler<SignUpData>({
    initialData: {
      email: user.email || '',
      password: user.password || '',
      password_confirmation: user.password_confirmation || '',
      recaptcha_token: ''
    },
    postUrl: '/sign_up',
    onSuccess: () => {
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    data.recaptcha_token = recaptchaRef.current
      ? await recaptchaRef.current.executeAsync()
      : ''
      submit(e)
    }

  const renderTextInput = (
    type: string,
    id: KeysWithStringValues<SignUpData>,
    placeholder: string
  ): ReactElement => {
    return (
      <Input id={id} placeholder={placeholder} type={type} name={id} value={data[id]} onChange={(e) => updateField(id, e.target.value)} error={errors.email} />
    )
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className={cn('w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-md border-2 border-gray-300', 'dark:bg-black dark:border-gray-700')}>
        <h2 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
          新建账号
        </h2>
        <p className='max-w-sm mt-2 text-sm text-neutral-600 dark:text-neutral-300'>
          如果可以的话请注册博客，开始你的新旅程！
        </p>

        <form className='my-8' onSubmit={handleSubmit}>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>电子邮箱</Label>
            {renderTextInput('email', 'email', 'projectmayhem@fc.com')}
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password'>密码</Label>
            <InputWithPasswordStrengthIndicator id='password' placeholder='••••••••' type='password' name='password' value={data.password} onChange={(value) => updateField('password', value)} error={errors.password} />
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password_confirmation'>密码确认</Label>
            <InputWithPasswordStrengthIndicator id='password_confirmation' placeholder='••••••••' type='password' name='password_confirmation' value={data.password_confirmation} onChange={(value) => updateField('password_confirmation', value)} error={errors.password_confirmation}  />
          </LabelInputContainer>

          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
          <div className='flex items-start mt-2 mb-2'>
            <div className='flex items-center h-5'>
              <input
                id='terms'
                aria-describedby='terms'
                type='checkbox'
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
              />
            </div>
            <div className='ml-3 text-sm'>
              <label
                htmlFor='terms' className='font-light text-gray-500 dark:text-gray-300'
              >我接受 <a className='font-medium text-primary-600 hover:underline dark:text-primary-500' href='#'>条款条件</a>
              </label>
            </div>
          </div>

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey='6LfkEYUqAAAAAOacT9yEDlhWHnXbaZ5IJhVFbXIf'
            size='invisible'
            hl='zh-CN'  // 添加语言参数
            async={true}  // 确保异步加载
          />

          <button
            className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            type='submit'
            disabled={processing}
          >
            注册 &rarr;
            <BottomGradient />
          </button>
          <div className='flex items-center mt-2 text-sm font-light text-gray-500 dark:text-gray-400'>
            已经有账号? <div onClick={() => { router.get('/sign_in') }} className='ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500'>点击登录</div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUpForm

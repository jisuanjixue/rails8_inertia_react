import { useForm } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/motion-label";
import { Input } from "@/components/ui/motion-input";
import LabelInputContainer from "@/components/ui/label-input-container";
import BottomGradient from "@/components/ui/bottom-gradient";

const useChangePassword = ({ user }) => {
  const form = useForm({
    password_challenge: '',
    password: '',
    password_confirmation: '',
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    form.transform((data) => (data))
    form.patch(`/change_password`)
  }

  const render = () => {

    return (
      <form onSubmit={handleSubmit} className="contents">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password_challenge" className="text-left text-white">
            旧密码
          </Label>
          <Input id="password_challenge" onChange={(e) => setData('password_challenge', e.target.value)} value={data.password_challenge} className="w-80" />
          {errors.password_challenge && (
            <div className="px-3 py-2 font-medium text-red-500">
              {errors.password_challenge.join(', ')}
            </div>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-left text-white">
            新密码
          </Label>
          <Input id="password" onChange={(e) => setData('password', e.target.value)} value={data.password} className="w-80" />
          <div className="px-3 py-2 font-medium text-red-500">
            {errors.password && (
              <div className="px-3 py-2 font-medium text-red-500">
                {errors.password.join(', ')}
              </div>
            )}
          </div>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password_confirmation" className="text-left text-white">
            密码确认
          </Label>
          <Input id="password_confirmation" onChange={(e) => setData('password_confirmation', e.target.value)} value={data.password_confirmation} className="w-80" />
          {errors.password_confirmation && (
            <div className="px-3 py-2 font-medium text-red-500">
              {errors.password_confirmation.join(', ')}
            </div>
          )}
        </LabelInputContainer>
        <Button
          variant="secondary"
          type="submit"
          disabled={processing}>修改密码</Button>
        <BottomGradient />
      </form>
    )
  }

  return { render }
}

export default useChangePassword

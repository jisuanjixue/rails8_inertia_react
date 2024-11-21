import { useForm } from '@inertiajs/react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from '@/components/ui/dialog'

const useChangePassword = ({user}) => {
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
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password_challenge" className="text-right">
              旧密码
            </Label>
            <Input id="password_challenge" onChange={(e) => setData('password_challenge', e.target.value)} value={data.password_challenge} className="col-span-3" />
            {errors.password_challenge && (
              <div className="px-3 py-2 font-medium text-red-500">
                {errors.password_challenge.join(', ')}
              </div>
            )}
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password" className="text-right">
              新密码
            </Label>
            <Input id="password" onChange={(e) => setData('password', e.target.value)} value={data.password} className="col-span-3" />
            <div className="px-3 py-2 font-medium text-red-500">
              {errors.password && (
                <div className="px-3 py-2 font-medium text-red-500">
                  {errors.password.join(', ')}
                </div>
              )}
            </div>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password_confirmation" className="text-right">
              密码确认
            </Label>
            <Input id="password_confirmation" onChange={(e) => setData('password_confirmation', e.target.value)} value={data.password_confirmation} className="col-span-3" />
            {errors.password_confirmation && (
              <div className="px-3 py-2 font-medium text-red-500">
                {errors.password_confirmation.join(', ')}
              </div>
            )}
          </div>
        </div>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            type="submit"
            disabled={processing}>确认</Button>
        </DialogTrigger>
      </form>
    )
  }

  return { render }
}

export default useChangePassword

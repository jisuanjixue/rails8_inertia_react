import { useForm } from '@inertiajs/react'
import { Label } from "@/components/ui/motion-label";
import { Input } from "@/components/ui/motion-input";
import LabelInputContainer from "@/components/ui/label-input-container";
import { Button } from "@/components/ui/button"
import BottomGradient from "@/components/ui/bottom-gradient";
import { FileUpload } from '@/components/ui/file-upload';
import { useSafeState } from 'ahooks';

const useEditInfo = ({ user }) => {
    const form = useForm({
        password_challenge: user.password_challenge || '',
        email: user.email || '',
        name: user.name || '',
        avatar: user.avatar || ''
    })
    const { data, setData, errors, processing } = form
    console.log("🚀 ~ useEditInfo ~ data:", data)

    const handleSubmit = (e) => {
        e.preventDefault()
        form.transform((data) => (data))
        form.patch(`/user_setting/update_profile`)
    }

    const [files, setFiles] = useSafeState<File[]>([]);
    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        setData('avatar', files[0]);
        // console.log(files[0]);
    };

    const render = () => {

        return (
            <>
                <div className="w-full h-40 max-w-xs mx-auto mb-4 bg-white border border-dashed rounded-lg dark:bg-black border-neutral-200 dark:border-neutral-800">
                    <FileUpload onChange={handleFileUpload} />
                </div>
                <form onSubmit={handleSubmit} className="contents">
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password_challenge" className="text-left text-white">
                            密码
                        </Label>
                        <Input id="password_challenge" onChange={(e) => setData('password_challenge', e.target.value)} value={data.password_challenge} className="w-80" />
                        {errors.password_challenge && (
                            <div className="px-3 py-2 font-medium text-red-500">
                                {errors.password_challenge.join(', ')}
                            </div>
                        )}
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email" className="text-left text-white">
                            邮箱
                        </Label>
                        <Input id="email" onChange={(e) => setData('email', e.target.value)} value={data.email} className="col-span-2" />
                        <div className="px-3 py-2 font-medium text-red-500">
                            {errors.email && (
                                <div className="px-3 py-2 font-medium text-red-500">
                                    {errors.email.join(', ')}
                                </div>
                            )}
                        </div>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="name" className="text-left text-white">
                            名称
                        </Label>
                        <Input id="name" onChange={(e) => setData('name', e.target.value)} value={data.name} className="w-80" />
                        <div className="px-3 py-2 font-medium text-red-500">
                            {errors.name && (
                                <div className="px-3 py-2 font-medium text-red-500">
                                    {errors.name.join(', ')}
                                </div>
                            )}
                        </div>
                    </LabelInputContainer>
                    <Button
                        variant="secondary"
                        type="submit"
                        disabled={processing}>修改信息</Button>
                    <BottomGradient />
                </form>
            </>

        )
    }

    return { render }
}

export default useEditInfo

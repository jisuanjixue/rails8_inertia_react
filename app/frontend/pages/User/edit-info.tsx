import { useForm } from '@inertiajs/react'
import { Label } from "@/components/ui/motion-label";
import { Input } from "@/components/ui/motion-input";
import LabelInputContainer from "@/components/ui/label-input-container";
import { Button } from "@/components/ui/button"
import BottomGradient from "@/components/ui/bottom-gradient";
import { FileUpload } from '@/components/ui/file-upload';
import { useSafeState } from 'ahooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const EditInfo = ({ user, avatar }) => {
    const form = useForm({
        email: user.email || '',
        name: user.name || '',
        avatar: user.avatar || ''
    })
    const { data, setData, errors, processing } = form

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

    return (
        <>
            <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full h-40 max-w-xs mx-auto mb-4 bg-white border border-dashed rounded-lg dark:bg-black border-neutral-200 dark:border-neutral-800">
                <FileUpload onChange={handleFileUpload} />
            </div>
            <form onSubmit={handleSubmit} className="contents">
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

export default EditInfo

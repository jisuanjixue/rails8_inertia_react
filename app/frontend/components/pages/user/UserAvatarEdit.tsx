import { useState, useEffect, ReactElement } from 'react'
import { useForm, router } from '@inertiajs/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { z } from 'zod'
import { FileUpload } from '@/components/ui/file-upload'
import InputError from '@/components/forms/input-error'
import { useToast } from '@/hooks/use-toast'

const ALLOWED_CONTENT_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
const MAX_PROFILE_PICTURE_SIZE = 1 * 1024 * 1024 // 1MB

const profilePicSchema = z.object({
  profile_picture: z
    .instanceof(File, { message: '请选择一个文件。' })
    .refine((file) => {
      return file.size <= MAX_PROFILE_PICTURE_SIZE
    }, '文件大小必须小于1 MB.')
    .refine((file) => {
      return ALLOWED_CONTENT_TYPES.includes(file.type)
    }, '文件类型无效。支持的格式：PNG, JPG, JPEG, WEBP.')
})

interface UserAvatarProps {
  userId: number
}

export default function UserAvatarEdit({
  userId
}: UserAvatarProps): ReactElement {
  const { toast } = useToast()
  const { data, setData, patch, processing, errors, setError, clearErrors, hasErrors } = useForm({
    profile_picture: '' as File | string
  })
  const [activeStorage, setActiveStorage] = useState<typeof import('@rails/activestorage') | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)

  useEffect(() => {
    void (async () => {
      const module = await import('@rails/activestorage')
      module.start()
      setActiveStorage(module)
    })()
  }, [])

  function submit(e: React.FormEvent): void {
    e.preventDefault()

    const result = profilePicSchema.safeParse(data)
    if (!result.success) {
      const issues = result.error.issues
      issues.forEach(issue => {
        setError('profile_picture', issue.message)
      })
      return
    }

    if (activeStorage === null) {
      toast({
        variant: "destructive",
        title: "发生错误, 请刷新页面.",
      })
      return
    }

    const upload = new activeStorage.DirectUpload(
      data.profile_picture as File,
      '/rails/active_storage/direct_uploads?subfolder=profile_pictures',
      {
        directUploadWillStoreFileWithXHR: (request) => {
          request.upload.addEventListener('progress', (event: ProgressEvent) => {
            if (event.lengthComputable) {
              const progress = (event.loaded / event.total) * 100
              setUploadProgress(progress)
            }
          })
        }
      }
    )

    upload.create((error, blob) => {
      setUploadProgress(null)
      if (error !== null) {
        toast({
          variant: "destructive",
          title: "保存您的个人资料照片时发生错误.",
        })
      } else {
        data.profile_picture = blob.signed_id
        patch(`/users/${userId}/profile_picture`, {
          onSuccess: () => {
            if (!hasErrors) {
              toast({
                title: "您的个人资料照片已成功更新.",
              })
            }
          }
        })
      }
    })
  }

  function destroy(): void {
    router.delete(`/users/${userId}/profile_picture`, {
      onSuccess: () => {
        toast({
          title: "您的个人资料照片已被删除.",
        })
      }
    })
  }

  // const handleFileUpload = (files: File[]) => {
  //   const formData = new FormData()
  //   formData.append('avatar', files[0])
  //   router.post('/upload_avatar', formData, {
  //     forceFormData: true,
  //     preserveScroll: true,
  //     preserveState: true,
  //     onSuccess: () => {
  //       router.reload()
  //     },
  //     onError: (errors) => {
  //       console.error('Profile update failed:', errors)
  //     }
  //   })
  // }

  return (
    <AlertDialog>
      <form onSubmit={submit} className=''>
        <FileUpload
          id='profile_picture' onChange={(files) => {
            if (files == null) return
            setData('profile_picture', files[0])
            // handleFileUpload(files)
            clearErrors('profile_picture')
          }}
        />
        {Boolean(errors.profile_picture) && <InputError>{errors.profile_picture}</InputError>}
        <Button
          type='submit'
          disabled={uploadProgress !== null || processing || hasErrors}
        >
          更新
        </Button>
      </form>
      <Progress
        className={uploadProgress !== null ? 'mt-4' : 'hidden'}
        value={uploadProgress ?? 0}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>您确定吗？</AlertDialogTitle>
          <AlertDialogDescription>
            您即将删除您的个人资料照片。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>返回</AlertDialogCancel>
          <AlertDialogAction onClick={destroy}>
            继续
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

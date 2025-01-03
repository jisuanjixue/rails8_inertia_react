import { useState, useEffect, ReactElement } from 'react'
import {  useForm } from '@inertiajs/react'
// import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { z } from 'zod'
import { FileUpload } from '@/components/ui/file-upload'
import InputError from '@/components/forms/input-error'
import { useToast } from '@/hooks/use-toast'
import { FloatingPanelForm, FloatingPanelSubmitButton } from '@/components/ui/floating-panel'
// import PostCoverShow from './PostCoverShow'

const ALLOWED_CONTENT_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
const MAX_post_cover_SIZE = 3 * 1024 * 1024 // 1MB

const profilePicSchema = z.object({
  post_cover: z
    .instanceof(File, { message: '请选择一个文件。' })
    .refine((file) => {
      return file.size <= MAX_post_cover_SIZE
    }, '文件大小必须小于3 MB.')
    .refine((file) => {
      return ALLOWED_CONTENT_TYPES.includes(file.type)
    }, '文件类型无效。支持的格式：PNG, JPG, JPEG, WEBP.')
})

interface PostCoverProps {
  postId: string
  postCoverUrl?: string
}

export default function PostCoverEdit({
  postId,
  // postCoverUrl
}: PostCoverProps): ReactElement {
  const { toast } = useToast()
  const { data, setData, patch, post, processing, errors, setError, clearErrors, hasErrors } = useForm({
    post_cover: '' as File | string
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

  function submit(): void {

    const result = profilePicSchema.safeParse(data)
    if (!result.success) {
      const issues = result.error.issues
      issues.forEach(issue => {
        setError('post_cover', issue.message)
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
      data.post_cover as File,
      '/rails/active_storage/direct_uploads?subfolder=post_covers',
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
          title: "保存文章封面时发生错误.",
        })
      } else {
        data.post_cover = blob.signed_id
        if (postId) {
          patch(`/posts/${postId}/post_cover`)
        } else {
          post(`/upload_cover`, {
            onSuccess: () => {
              if (!hasErrors) {
              //  router.get(`/posts/${postId}/edit`)
              }
            }
          })
        }
      }
    })
  }



  return (
   
    <div className="grid grid-cols-2 gap-8">
    {/* {postCoverUrl && (
      <PostCoverShow postCoverUrl={postCoverUrl}  postId={postId} />
    )} */}
      <div>
     <FloatingPanelForm onSubmit={submit}>
          <FileUpload
            id='post_cover' 
            onChange={(files) => {
              if (files == null) return
              setData('post_cover', files[0])
              clearErrors('post_cover')
            }}
          />
          {Boolean(errors.post_cover) && <InputError>{errors.post_cover}</InputError>}
          <FloatingPanelSubmitButton
            disabled={uploadProgress !== null || processing || hasErrors}
            submitText="确定"
          />
          <Progress
            className={uploadProgress !== null ? 'mt-4' : 'hidden'}
            value={uploadProgress ?? 0}
          />
        </FloatingPanelForm>
      </div>
  </div>
  )
}

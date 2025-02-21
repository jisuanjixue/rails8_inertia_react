// import { createImageUpload } from "novel/plugins";
// import { toast } from '@/hooks/use-toast'


// const onUpload = (file: File) => {
//   const promise = fetch("/api/upload", {
//     method: "POST",
//     headers: {
//       "content-type": file?.type || "application/octet-stream",
//       "x-vercel-filename": file?.name || "image.png",
//     },
//     body: file,
//   });
//     return new Promise((resolve, reject) => {
//       promise.then(async (res) => {
//             // Successfully uploaded image
//             if (res.status === 200) {
//               const { url } = (await res.json()) as { url: string };
//               // preload the image
//               const image = new Image();
//               image.src = url;
//               image.onload = () => {
//                 resolve(url);
//               };
//               toast({
//                 variant: 'default',
//                 title: 'Image uploaded successfully'
//               })
//               // No blob store configured
//             } else if (res.status === 401) {
//               resolve(file);
//               throw new Error("`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.");
//               // Unknown error
//             } else {
//               throw new Error("Error uploading image. Please try again.");
//             }
//           })
//     });
// };

// export const uploadFn = createImageUpload({
//   onUpload,
//   validateFn: (file) => {
//     if (!file.type.includes("image/")) {
//       toast({
//         variant: 'destructive',
//         title: 'File type not supported.'
//       })
//       return false;
//     }
//     if (file.size / 1024 / 1024 > 20) {
//       toast({
//         variant: 'destructive',
//         title: 'File size too big (max 20MB).'
//       })
//       return false;
//     }
//     return true;
//   },
// });


import { createImageUpload } from "novel/plugins"
import { toast } from '@/hooks/use-toast'
import { router } from '@inertiajs/react'

const ALLOWED_CONTENT_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

const onUpload = async (file: File) => {
  try {
    const activeStorage = await import('@rails/activestorage')
    activeStorage.start()

    return new Promise((resolve, reject) => {
      const upload = new activeStorage.DirectUpload(
        file,
        '/rails/active_storage/direct_uploads?subfolder=post_images',
        {
          directUploadWillStoreFileWithXHR: (request) => {
            request.upload.addEventListener('progress', (event: ProgressEvent) => {
              if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 100
                // 这里可以处理上传进度
              }
            })
          }
        }
      )

      upload.create( async (error, blob) => {
        const formData = new FormData()
formData.append('signed_id', blob.signed_id)
        if (error) {
          toast({
            variant: "destructive",
            title: "上传图片时发生错误"
          })
          reject(error)
        } else {
          router.post('/upload_post_image', {
            signed_id: blob.signed_id
          }, {
            onSuccess: (response) => {
              toast({
                variant: 'default',
                title: '图片上传成功'
              })
              resolve(response.url)
            },
            onError: () => {
              toast({
                variant: 'destructive',
                title: '保存图片时发生错误'
              })
              reject(new Error('保存失败'))
            }
          })

          // try {
          //   const response = await fetch('/upload_post_image', {
          //     method: 'POST',
          //     headers: {
          //       "x-vercel-filename": encodeURIComponent(file?.name || "image.png"),
          //       'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content
          //     },
          //     body: formData
          //   })
            
          //   if(!response.ok) throw new Error('上传失败')
          //   const data = await response.json()
          //   if (!data.url) {
          //     throw new Error('服务器返回数据格式错误')
          //   }
          //   toast({
          //     variant: 'default',
          //     title: '图片上传成功'
          //   })
          //   resolve(data.url)
          // } catch(err) {
          //   console.error('上传错误:', err);
          //   toast({
          //     variant: 'destructive',
          //     title: `保存图片失败: ${err.message}`
          //   })
          //   reject(err)
          // }
        }
      })
    })
  } catch (error) {
    toast({
      variant: 'destructive',
      title: '初始化上传组件失败'
    })
    throw error
  }
}

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!ALLOWED_CONTENT_TYPES.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: '不支持的文件类型'
      })
      return false
    }
    if (file.size > MAX_FILE_SIZE) {
      toast({
        variant: 'destructive',
        title: '文件大小超过20MB限制'
      })
      return false
    }
    return true
  },
})
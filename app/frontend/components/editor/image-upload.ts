import { createImageUpload } from "novel/plugins";
import { toast } from '@/hooks/use-toast'


const onUpload = (file: File) => {
  const promise = fetch("/api/upload", {
    method: "POST",
    headers: {
      "content-type": file?.type || "application/octet-stream",
      "x-vercel-filename": file?.name || "image.png",
    },
    body: file,
  });
    return new Promise((resolve, reject) => {
      promise.then(async (res) => {
            // Successfully uploaded image
            if (res.status === 200) {
              const { url } = (await res.json()) as { url: string };
              // preload the image
              const image = new Image();
              image.src = url;
              image.onload = () => {
                resolve(url);
              };
              toast({
                variant: 'default',
                title: 'Image uploaded successfully'
              })
              // No blob store configured
            } else if (res.status === 401) {
              resolve(file);
              throw new Error("`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.");
              // Unknown error
            } else {
              throw new Error("Error uploading image. Please try again.");
            }
          })
    });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast({
        variant: 'destructive',
        title: 'File type not supported.'
      })
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast({
        variant: 'destructive',
        title: 'File size too big (max 20MB).'
      })
      return false;
    }
    return true;
  },
});

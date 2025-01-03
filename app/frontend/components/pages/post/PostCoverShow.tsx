import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
  } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { router } from '@inertiajs/react'
import { Trash2 } from 'lucide-react'

const PostCoverShow = ({  postId, postCoverUrl }: {  postId: string,postCoverUrl?: string }) => {

  const destroy = (): void => {
    router.delete(`/posts/${postId}/post_cover`, {
      onSuccess: () => {
        toast({
          title: "文章封面已被删除.",
        })
      }
    })
  }
    return (
        <div className="relative group w-full h-[200px]">
        <img src={postCoverUrl} className='object-cover w-full h-full rounded-lg' />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="absolute transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>您确定吗？</AlertDialogTitle>
              <AlertDialogDescription>
                您即将删除文章封面。
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
      </div>
    )
}

export default PostCoverShow
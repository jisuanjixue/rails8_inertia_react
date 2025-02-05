import { Link, Head, router, usePage } from '@inertiajs/react'
import Post from './Post'
import DefaultLayout from '../DefaultLayout'
import { BookmarkIcon, HeartIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
interface Flash {
  alert: string | undefined
  notice: string | undefined
}

const Show = ({ post }) => {
  const { flash } = usePage().props as unknown as { flash: Flash }
  const showProfile = post.likers_info.map(m => ({ id: m.id, name: m.name, designation: m.profile_tagline, image: m.avatar_url }))

  const handleLike = () => {
    router.post(`/posts/${post.id}/likes`)
  }

  const handleUnlike = () => {
    router.delete(`/posts/${post.id}/likes/${post.current_user_like_id}`)
  }


  const handleBookmark = () => {
    router.post(`/posts/${post.id}/book_marks`)
  }

  const handleUnbookmark = () => {
    router.delete(`/posts/${post.id}/book_marks/${post.current_user_bookmark_id}`)
  }

  return (
    <>
      <Head title={`文章 #${post.id}`} />
      <div className='w-full px-4 pt-6 mx-auto md:w-2/3 lg:px-8'>
        <div className='space-y-4'>
          <Post post={post} />
          <div className='flex items-center gap-6'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {post.current_user_like_id ? (
                    <button
                      onClick={handleUnlike}
                      className='flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors'
                    >
                      <HeartIcon className='w-5 h-5 fill-current' />
                      <span className='text-base'>{post.likes_count}个赞</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleLike}
                      className='flex items-center gap-1.5 text-gray-400 hover:text-gray-500 transition-colors'
                    >
                      <HeartIcon className='w-5 h-5 fill-current' />
                      <span className='text-base'>{post.likes_count}个赞</span>
                    </button>
                  )}
                </TooltipTrigger>
                <TooltipContent className="p-4">
                  <AnimatedTooltip items={showProfile} avatarSize={32} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {post.current_user_bookmark_id ? (
              <button
                onClick={handleUnbookmark}
                className='flex items-center gap-1.5 text-yellow-500 hover:text-yellow-600 transition-colors'
              >
                <BookmarkIcon className='w-5 h-5 fill-current' />
                <span className='text-base'>{post.bookmarks_count}收藏</span>
              </button>
            ) : (
              <button
                onClick={handleBookmark}
                className='flex items-center gap-1.5 text-gray-400 hover:text-gray-500 transition-colors'
              >
                <BookmarkIcon className='w-5 h-5 fill-current' />
                <span className='text-base'>{post.bookmarks_count}收藏</span>
              </button>
            )}
          </div>
          <div className='flex flex-wrap gap-2'>
            {post.can_edit &&
              <Link
                href={`/posts/${post.id}/edit`}
                className='inline-block px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50'
              >
                编辑
              </Link>}
            <Link
              href='/posts'
              className='inline-block px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50'
            >
              返回列表
            </Link>
            {post.can_destroy && <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' className='px-5 py-3'>删除</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>您确定要删除吗？</AlertDialogTitle>
                  <AlertDialogDescription>
                    删除这篇文章后其他人无法查看。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={() => router.delete(`/posts/${post.id}`, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                      router.reload({ only: ['posts'] })
                      flash.notice = '分类删除成功'
                    },
                    onError: () => {
                      flash.alert = '分类删除失败'
                    }
                  })}
                  >确定
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>}
          </div>
        </div>
      </div>
    </>
  )
}

Show.layout = (page: any) => <DefaultLayout children={page} />
export default Show
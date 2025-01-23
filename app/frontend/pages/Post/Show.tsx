import { Link, Head, router } from '@inertiajs/react'
import Post from './Post'
import DefaultLayout from '../DefaultLayout'
import { BookmarkIcon, HeartIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'

const Show = ({ post }) => {
  const showProfile = post.likers_info.map(m => ({id: m.id, name: m.name, designation: m.profile_tagline, image: m.avatar_url}))
  console.log("🚀 ~ Show ~ post:", post)
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      e.preventDefault()
    }
  }

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
          <div className='flex items-center gap-4'>
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
                <TooltipContent  className="p-4">
                  <AnimatedTooltip items={showProfile} avatarSize={32} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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
            {post.can_destroy &&
              <Link
                href={`/posts/${post.id}`}
                onClick={onDestroy}
                as='button'
                method='delete'
                className='px-4 py-2 text-sm font-medium text-red-600 transition-colors bg-white border border-red-200 rounded-lg hover:bg-red-50'
              >
                删除
              </Link>}
          </div>
        </div>
      </div>
    </>
  )
}

Show.layout = (page: any) => <DefaultLayout children={page} />
export default Show
import { Link, Head, router } from '@inertiajs/react'
import Post from './Post'
import DefaultLayout from '../DefaultLayout'

const Show = ({ post }) => {
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

  return (
    <>
      <Head title={`文章 #${post.id}`} />
      <div className='w-full px-4 pt-6 mx-auto md:w-2/3 lg:px-8'>
        <div className='space-y-4'>
          <div className='flex items-center gap-4'>
            {post.current_user_like_id ? (
              <button 
                onClick={handleUnlike}
                className='px-4 py-2 text-sm font-medium text-red-600 transition-colors bg-white border border-red-200 rounded-lg hover:bg-red-50'
              >
                Unlike
              </button>
            ) : (
              <button 
                onClick={handleLike}
                className='px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50'
              >
                Like
              </button>
            )}
            <span className='text-sm text-gray-600'>{post.likes_count} Likes</span>
          </div>
          
          <Post post={post} />
          
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
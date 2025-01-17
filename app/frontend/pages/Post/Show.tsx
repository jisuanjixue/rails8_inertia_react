import { Link, Head } from '@inertiajs/react'
import Post from './Post'
import DefaultLayout from '../DefaultLayout'
import TailwindAdvancedEditor from '@/components/editor/advanced-editor'

const Show = ({ post }) => {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head title={`文章 #${post.id}`} />
      <div className='w-full px-8 pt-8 mx-auto md:w-2/3'>
        <div className='mx-auto'>
          <Post post={post} />
          <TailwindAdvancedEditor />
          {post.can_edit &&
          <Link
            href={`/posts/${post.id}/edit`}
            className='inline-block px-5 py-3 mt-2 font-medium bg-gray-100 rounded-lg'
          >
            编辑
          </Link>}
          <Link
            href='/posts'
            className='inline-block px-5 py-3 ml-2 font-medium bg-gray-100 rounded-lg'
          >
            返回列表
          </Link>
          {post.can_destroy &&
          <div className='inline-block ml-2'>
            <Link
              href={`/posts/${post.id}`}
              onClick={onDestroy}
              as='button'
              method='delete'
              className='px-5 py-3 mt-2 font-medium bg-gray-100 rounded-lg'
            >
              删除
            </Link>
          </div>}
        </div>
      </div>
    </>
  )
}

Show.layout = (page: any) => <DefaultLayout children={page} />
export default Show
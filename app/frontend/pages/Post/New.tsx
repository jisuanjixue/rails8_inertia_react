import { Link, Head } from '@inertiajs/react'
import Form from './Form'
import CategoryType from '../../types/serializers/Category'
import PostType from '../../types/serializers/Post'
import DefaultLayout from '../DefaultLayout'

const PostNew = ({ post, categories, post_cover_url }: { post: PostType, categories: CategoryType[], post_cover_url?: string }) => {
  console.log("🚀 ~ PostNew ~ post_cover_url:", post_cover_url)
  
  return (
    <>
      <Head title='新建文章' />
      <div className='w-full px-8 pt-8 mx-auto mt-8 text-gray-900 bg-white rounded-lg shadow-lg  min-h-[calc(100vh-200px)] overflow-y-auto'>
        <Form
          post={post}
          post_cover_url={post_cover_url}
          categories={categories}
          postUrl='/posts'
          submitText='新建'
        />

        <Link
          href='/posts'
          className='inline-block px-5 py-3 ml-2 font-medium bg-gray-100 rounded-lg'
        >
          返回
        </Link>
      </div>
    </>
  )
}

PostNew.layout = (page: any) => <DefaultLayout children={page} />
export default PostNew

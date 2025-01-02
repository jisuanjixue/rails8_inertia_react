import { Link, Head } from '@inertiajs/react'
import Form from './Form'
import PostType from '../../types/serializers/Post'
import CategoryType from '../../types/serializers/Category'
import DefaultLayout from '../DefaultLayout'

const  PostEdit = ({ post, categories, post_cover_url }: { post: PostType, categories: CategoryType[], post_cover_url?: string }) => {
  return (
    <>
      <Head title='编辑文章' />
      <div className='w-full px-8 pt-8 mx-auto md:w-2/3'>
        <Form
          post={post}
          categories={categories}
          patchUrl={`/posts/${post.id}`}
          post_cover_url={post_cover_url}
          submitText='编辑'
        />

        <Link
          href={`/posts/${post.id}`}
          className='inline-block px-5 py-3 ml-2 font-medium bg-gray-100 rounded-lg'
        >
          查看
        </Link>
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

PostEdit.layout = (page: any) => <DefaultLayout children={page} />
export default PostEdit

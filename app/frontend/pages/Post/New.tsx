import { Link, Head } from '@inertiajs/react'
import Form from './Form'
import CategoryType from '../../types/serializers/Category'
import PostType from '../../types/serializers/Post'
import DefaultLayout from '../DefaultLayout'

const PostNew = ({ post, categories }: { post: PostType, categories: CategoryType[] }) => {
  return (
    <>
      <Head title='新建文章' />
      <div className='w-full px-8 pt-8 mx-auto md:w-2/3'>
        <Form
          post={post}
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

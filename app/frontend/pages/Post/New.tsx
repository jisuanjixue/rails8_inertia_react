import { Link, Head } from '@inertiajs/react'
import Form from './Form'
import CategoryType from '../../types/serializers/Category'
import PostType from '../../types/serializers/Post'

export default function New ({ post, categories }: { post: PostType, categories: CategoryType[] }) {
  return (
    <>
      <Head title='新建文章' />

      <div className='w-full px-8 pt-8 mx-auto md:w-2/3'>
        <h1 className='text-4xl font-bold'>新建</h1>

        <Form
          post={post}
          categories={categories}
          // onSubmit={(form, categoryId) => {
          //   form.transform((data) => ({ post: { ...data, category_id: categoryId } }))
          //   form.post('/posts')
          // }}
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

import { Link, Head } from '@inertiajs/react'
import Form from './Form'
import PostType from '../../types/serializers/Post'

export default function Edit({ post }: { post: PostType }) {
  return (
    <>
      <Head title="Editing post" />

      <div className="w-full px-8 pt-8 mx-auto md:w-2/3">
        <h1 className="text-4xl font-bold">Editing post</h1>

        <Form
          post={post}
          onSubmit={(form, content) => {
            form.transform((data) => ({ post: {...data, content }}))
            form.patch(`/posts/${post.id}`)
          }}
          submitText="Update post"
        />

        <Link
          href={`/posts/${post.id}`}
          className="inline-block px-5 py-3 ml-2 font-medium bg-gray-100 rounded-lg"
        >
          Show this post
        </Link>
        <Link
          href="/posts"
          className="inline-block px-5 py-3 ml-2 font-medium bg-gray-100 rounded-lg"
        >
          Back to posts
        </Link>
      </div>
    </>
  )
}

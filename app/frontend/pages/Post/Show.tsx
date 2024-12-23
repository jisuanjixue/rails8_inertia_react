import { Link, Head } from '@inertiajs/react'
import Post from './Post'

export default function Show({ post, flash }) {
  console.log("🚀 ~ Show ~ post:", post)
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head title={`文章 #${post.id}`} />

      <div className="w-full px-8 pt-8 mx-auto md:w-2/3">
        <div className="mx-auto">
          {flash.notice && (
            <p className="inline-block px-3 py-2 mb-5 font-medium text-green-500 rounded-lg bg-green-50">
              {flash.notice}
            </p>
          )}

          <h1 className="text-4xl font-bold">文章 #{post.id}</h1>

          <Post post={post} />

          <Link
            href={`/posts/${post.id}/edit`}
            className="inline-block px-5 py-3 mt-2 font-medium bg-gray-100 rounded-lg"
          >
            编辑
          </Link>
          <Link
            href="/posts"
            className="inline-block px-5 py-3 ml-2 font-medium bg-gray-100 rounded-lg"
          >
            返回列表
          </Link>
          <div className="inline-block ml-2">
            <Link
              href={`/posts/${post.id}`}
              onClick={onDestroy}
              as="button"
              method="delete"
              className="px-5 py-3 mt-2 font-medium bg-gray-100 rounded-lg"
            >
             删除
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

import { Link, Head } from '@inertiajs/react'
import { Fragment } from 'react'
import Post from './Post'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Index({ posts, flash }) {
  return (
    <>
      <Head title="Posts" />
      <div className="w-full px-8 pt-8 mx-auto md:w-2/3">
        {flash.notice && (
          <Card className="p-3 mb-4 rounded-lg bg-green-50">
            <p className="text-sm">{flash.notice}</p>
          </Card>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">文章</h1>
          <Link
            href="/posts/new"
            className='px-5 py-3'
          >
            <Button variant="destructive">
             创建
            </Button>
          </Link>
        </div>

        <div className="min-w-full">
          {posts.map((post) => (
            <Fragment key={post.id}>
              <Post post={post} />
              <p className="my-5">
                <Link
                  href={`/posts/${post.id}`}
                  className='py-3 pr-5 ml-2'
                >
                  <Button variant="outline">
                    详情
                  </Button>
                </Link>
              </p>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

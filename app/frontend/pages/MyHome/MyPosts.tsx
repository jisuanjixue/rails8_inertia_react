import { Link, Head, router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import DefaultLayout from '../DefaultLayout'
import PostType from '../../types/serializers/Post'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

const PostIndex = ({ posts }: { posts: PostType[] }) => {
  const renderCards = posts.map((post, index) => {
    return (
      <div onClick={() => router.get(`/posts/${post.id}`)} key={index}>
        <CardContainer containerClassName="w-full py-4" >
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[25rem] h-auto rounded-xl p-6 border">
            <div className="flex flex-col h-full">
              {/* Top: Cover Image */}
              <CardItem translateZ="50" className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={post?.post_cover_url || 'https://source.unsplash.com/random/800x600'}
                  className="object-cover w-full h-full"
                />
              </CardItem>

              {/* Middle: Title & Subtitle */}
              <CardItem translateZ="30" className="flex-1 p-4">
                <h2 className="text-xl font-bold text-neutral-800">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-neutral-400 line-clamp-3">
                  {post.sub_title || 'No subtitle available'}
                </p>
              </CardItem>

              {/* Bottom: Author Info */}
              <CardItem translateZ="20" className="flex items-center p-4 border-t border-neutral-800 hover:border-neutral-700">
                <img
                  src={post.user.avatar_url || 'https://i.pravatar.cc/150?img=3'}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-800">
                    {post.user.name}
                  </p>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {post.user.profile_tagline || 'No bio available'}
                  </p>
                </div>
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    )
  })

  return (
    <div className="relative flex flex-col items-start justify-start w-full min-h-screen mt-8 bg-black">
      <Head title="Posts" />
      <div className="w-full px-8 pt-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">文章</h1>
          <Link href="/posts/new" className="px-5 py-3">
            <Button variant="destructive">创建</Button>
          </Link>
        </div>
        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {renderCards}
        </div>
      </div>
    </div>
  )
}

PostIndex.layout = (page: any) => <DefaultLayout children={page} />
export default PostIndex

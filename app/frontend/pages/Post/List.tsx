import { Link, router, WhenVisible } from '@inertiajs/react'
import { FollowerPointerCard } from '@/components/ui/following-pointer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useInfiniteScroll } from 'ahooks';
import { useRef } from 'react';

export default function List({ posts, meta, total }: { posts: any[], meta: any, total: number }) {
    const getLoadMoreList = async (nextId?: string, limit = 10) => {
        const page = nextId ? parseInt(nextId) : 1;
        
        await router.get('/all_posts', {
            page,
            limit
        }, {
            preserveState: true,
            preserveScroll: true,
            only: ['posts', 'meta'],
        });
    
        const start = (page - 1) * limit;
        const end = start + limit;
        const list = posts.slice(start, end);
        const nId = meta.page < meta.last ? (page + 1).toString() : undefined;
    
        return {
            list,
            nextId: nId,
        };
    }
    const ref = useRef<HTMLDivElement>(null);
    const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
        (currentData) => getLoadMoreList(currentData?.nextId, meta.limit),
        {
            target: ref,
            isNoMore: (d) => d?.nextId === undefined,
        }
    );

  return (
    <div ref={ref} style={{ height: 300, overflow: 'auto', border: '1px solid', padding: 12 }}>
    {loading ? (
      <p>Loading...</p>
    ) : (
        <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.list?.map((post) => (
               <FollowerPointerCard
               title={
                 <TitleComponent
                   user={post.user}
                 />
               }
             >
               <div className="relative h-full overflow-hidden transition duration-200 bg-white border rounded-2xl group hover:shadow-xl border-zinc-100">
                 <div className="relative w-full overflow-hidden bg-gray-100 rounded-tl-lg rounded-tr-lg aspect-w-16 aspect-h-10 xl:aspect-w-16 xl:aspect-h-10">
                 <img 
                    src={post.post_cover_url} 
                    alt={post.id}
                    className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
                  />
                 </div>
                 <div className="p-4 ">
                   <h2 className="my-4 text-lg font-bold text-zinc-700">
                     {post.title}
                   </h2>
                   <h2 className="my-4 text-sm font-normal text-zinc-500">
                     {post.sub_title || post.body}
                   </h2>
                   <div className="flex flex-row items-center justify-between mt-10">
                     <span className="text-sm text-gray-500">{post.created_at}</span>
                     <div className="relative z-10 block px-6 py-2 text-xs font-bold text-white bg-black rounded-xl">
                       更多
                     </div>
                   </div>
                 </div>
               </div>
             </FollowerPointerCard>
          ))}
        </div>
  
      </div>
    )}

    <div style={{ marginTop: 8 }}>
      {!noMore && (
        <button 
          type="button" 
          onClick={loadMore} 
          disabled={loadingMore}
          style={{ padding: '8px 16px', margin: '16px auto', display: 'block' }}
        >
          {loadingMore ? '加载中...' : '加载更多'}
        </button>
      )}

      {noMore && <span style={{ textAlign: 'center', display: 'block' }}>没有更多数据了</span>}
    </div>
  </div>
    
  )
}




const TitleComponent = (user: any) => (
  <div className="flex items-center space-x-2">
     <Avatar>
                      <AvatarImage src={user.avatar_url || 'https://i.pravatar.cc/150?img=3'} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
    <p>{user?.profile?.name || user?.profile?.full_name}</p>
  </div>
);

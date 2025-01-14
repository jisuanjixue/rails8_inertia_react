import { router } from '@inertiajs/react'
import { FollowerPointerCard } from '@/components/ui/following-pointer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useDeepCompareEffect, useInfiniteScroll, useSafeState } from 'ahooks';
import { useRef } from 'react';
import DefaultLayout from '../DefaultLayout';

const List = ({ posts, meta }: { posts: any[], meta: any, total: number }) => {
  const [initQuery, setInitQuery] = useSafeState(true)

    console.log("🚀 ~ List ~ posts:", posts)
    const getLoadMoreList = async (page: number, pageSize: number) => {
        // 直接发起请求获取新数据
        await router.get('/all_posts', {
            page,
            items: pageSize
        }, {
            replace: false,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setInitQuery(false)
              },
        });

       
        return {
            list: posts,
            total: meta.last * meta.limit,
        };
    }
    const ref = useRef<HTMLDivElement>(null);

    const { data, loading, loadMore, loadingMore, noMore, reload } = useInfiniteScroll(
        (d) => {
            if(initQuery)  return {
                list: posts,
                total: meta.last * meta.limit,
            };
            const page = d ? Math.ceil(d.list.length / meta.limit) + 1 : 1;
            return getLoadMoreList(page, meta.limit);
        },
        {
            target: ref,
            manual: false, // 添加manual配置
            isNoMore: (d) => !d || d.list.length >= d.total // 添加isNoMore判断
        }
    );


    return (
        <div ref={ref} style={{ height: typeof window !== 'undefined' ? window.innerHeight * 0.9 : '100vh', overflow: 'auto', padding: 12 }} className="container px-4 mx-auto">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {data?.list?.map((post) => (
                            <div key={post.id} onClick={() => router.get(`/posts/${post.id}`)}>
                                <FollowerPointerCard
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage src={post?.user?.avatar_url} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <p>{post?.user?.name}</p>
                                        </div>
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
                            </div>
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

List.layout = (page: any) => <DefaultLayout children={page} />
export default List
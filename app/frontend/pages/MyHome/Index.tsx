
import { Tabs } from '@/components/ui/motion-tabs'
import DefaultLayout from '../DefaultLayout'
import { router, usePage } from '@inertiajs/react'
import NoProfilePicture from '../../assets/user/no-profile-picture.svg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MyPosts from './MyPosts'
import MyComments from './MyComments'
import MyCollections from './MyCollections'
import MyFollowing from './MyFollowing'
import MyFollowers from './MyFollowers'
import { GlowingEffect } from '@/components/ui/glowing-effect'


const MyHome = ({ user, user_profile, github_repos, stats, posts, comments, collections, following, followers }) => {
    console.log("🚀 ~ MyHome ~  posts, comments, collections, following, followers:", posts, comments, collections, following, followers)
    // const handleTabChange = (newTab: string) => {
    //     router.get(`/my_tabs?tab=${newTab}`);
    // };
    const {
        auth: { currentUser, profile_picture_url },
    } = usePage().props as any
    const tabs = [
        {
            title: '文章',
            value: 'my_posts',
            content: (
                <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
                    <p>你发表的文章</p>
                    <MyPosts posts={posts}></MyPosts>
                </div>
            )
        },
        {
            title: '回帖',
            value: 'my_comments',
            content: (
                <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
                    <div className='h-full overflow-y-auto'>
                        <p>你发表的回复及你的文章回复</p>
                        <MyComments comments={comments}></MyComments>
                    </div>
                </div>
            )
        },
        {
            title: '收藏',
            value: 'my_collections',
            content: (
                <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
                    <div className='h-full overflow-y-auto'>
                        <MyCollections collections={collections}></MyCollections>
                    </div>
                </div>
            )
        },
        {
            title: '正在关注',
            value: 'my_following',
            content: (
                <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
                    <div className='h-full overflow-y-auto'>
                        <MyFollowing following={following}></MyFollowing>
                    </div>
                </div>
            )
        },
        {
            title: '关注者',
            value: 'my_followers',
            content: (
                <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
                    <div className='h-full overflow-y-auto'>
                        <MyFollowers followers={followers}></MyFollowers>
                    </div>
                </div>
            )
        },

    ]

    return (
        <div className="container flex gap-8 mx-auto my-20">
            {/* 左侧栏 */}
            <div className="w-1/4 space-y-4">
                {/* 个人信息卡片 */}
                <div className="relative rounded-2.5xl border p-6 md:rounded-3xl md:p-3">
                    <GlowingEffect
                        blur={0}
                        borderWidth={3}
                        spread={80}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                    />
                    <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                        <div className="p-2 border border-gray-600 rounded-lg w-fit">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={profile_picture_url ?? NoProfilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{user_profile.name}</h2>
                                    <p className="text-gray-400">会员</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2 text-gray-300">
                                <p>{stats.posts_count} 篇帖子 / {stats.comments_count} 条回帖</p>
                                <p>{stats.followers_count} 关注者 / {stats.following_count} 正在关注</p>
                                <p>{stats.collections_count} 收藏</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GitHub仓库卡片 */}
                <div className="relative rounded-2.5xl border p-6 md:rounded-3xl md:p-3">
                    <GlowingEffect
                        blur={0}
                        borderWidth={3}
                        spread={80}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                    />
                    <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                        <div className="p-2 border border-gray-600 rounded-lg w-fit">
                            <h3 className="mb-4 text-lg font-bold text-white">GitHub 仓库</h3>
                            <div className="space-y-2">
                                {github_repos?.map((repo) => (
                                    <div key={repo.name} className="text-gray-300 hover:text-white">
                                        <a href={repo.url} className="flex justify-between" target="_blank">
                                            <span>{repo.name}</span>
                                            <span>{repo.stars}</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 右侧内容 */}
            <div className='w-3/4 h-[40rem] [perspective:1000px] relative flex flex-col'>
                <Tabs tabs={tabs} />
            </div>
        </div>
    )
}

MyHome.layout = (page: any) => <DefaultLayout children={page} />
export default MyHome

import { Tabs } from '@/components/ui/motion-tabs'
import DefaultLayout from '../DefaultLayout'
import { usePage } from '@inertiajs/react'
import NoProfilePicture from '../../assets/user/no-profile-picture.svg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const MyHome = ({ user, user_profile, stats }) => {
    console.log("🚀 ~ MyHome ~ stats:", stats)
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
                    <></>
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
                        <></>
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
                        <></>
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
                        <p>你发表的回复及你的文章回复</p>
                        <></>
                    </div>
                </div>
            )
        },
        {
            title: '关注者',
            value: 'following_me',
            content: (
                <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
                    <div className='h-full overflow-y-auto'>
                        <></>
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
                <div className="bg-[#171717] rounded-lg p-6">
                    <div className="flex items-center space-x-4">
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

                {/* GitHub仓库卡片 */}
                <div className="bg-[#171717] rounded-lg p-6">
                    <h3 className="mb-4 text-lg font-bold text-white">GitHub 仓库</h3>
                    <div className="space-y-2">
                        {[
                            'pingcrm_react',
                            'Flowbite_rails_template',
                            'react_on_rails-with-api'
                        ].map((repo) => (
                            <div key={repo} className="text-gray-300 hover:text-white">
                                <a href="#" className="flex justify-between">
                                    <span>{repo}</span>
                                    <span>6</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 右侧内容 */}
            <div className='h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-6xl mx-auto w-full items-start justify-start my-20'>
                <Tabs tabs={tabs} />
            </div>
        </div>
    )
}

MyHome.layout = (page: any) => <DefaultLayout children={page} />
export default MyHome
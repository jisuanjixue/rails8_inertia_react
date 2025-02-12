import DefaultLayout from '../DefaultLayout'

const MyFollowers = ({ followers }) => {
    return (
        <div>
            {followers?.map((follower, index) => (
                <div key={index}>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <img src={follower?.avatar_url} alt={follower?.name} className='w-8 h-8 rounded-full' />
                            <div>
                                <p className='font-medium'>{follower?.name}</p>
                                {/* <p className='text-sm text-gray-500'>{new Date(follower.created_at).toLocaleString()}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}   

MyFollowers.layout = (page: any) => <DefaultLayout children={page} />
export default MyFollowers
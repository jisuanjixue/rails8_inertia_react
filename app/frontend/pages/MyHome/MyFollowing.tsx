import DefaultLayout from '../DefaultLayout'

const MyFollowing = ({ following }) => {
    return (
        <div>
            {following?.map((following, index) => (
                <div key={index}>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <img src={following?.avatar_url} alt={following?.name} className='w-8 h-8 rounded-full' />
                            <div>
                                <p className='font-medium'>{following?.name}</p>
                            </div>
                        </div>
                    </div>
                 
                </div>
            ))}
        </div>
    )
}   

MyFollowing.layout = (page: any) => <DefaultLayout children={page} />
export default MyFollowing
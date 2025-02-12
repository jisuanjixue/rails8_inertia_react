import DefaultLayout from '../DefaultLayout'

const MyComments = ({ comments }) => {
    console.log("🚀 ~ MyComments ~ comments:", comments)
    return (
        <div>
            {comments?.map((comment, index) => (
                <div key={index}>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <img src={comment?.user?.avatar_url} alt={comment?.user?.name} className='w-8 h-8 rounded-full' />  
                            <div>
                                <p className='font-medium'>{comment?.user?.name}</p>
                                <p className='text-sm text-gray-500'>{new Date(comment.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <p className='mt-2 text-gray-700'>{ comment?.content }</p>
                 
                </div>
            ))}
        </div>
    )
}   

MyComments.layout = (page: any) => <DefaultLayout children={page} />
export default MyComments

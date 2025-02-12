import DefaultLayout from '../DefaultLayout'
import { HeartIcon } from "lucide-react"

const MyCollections = ({ collections }) => {
    return (
        <div>
            {collections?.map((collection, index) => (
                <div key={index}>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <img src={collection?.user?.avatar_url} alt={collection?.user?.name} className='w-8 h-8 rounded-full' />
                            <div>
                                <p className='font-medium'>{collection?.user?.name}</p>
                                <p className='text-sm text-gray-500'>{new Date(collection?.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <HeartIcon className='w-4 h-4 fill-current' />
                            {/* <span className='text-sm text-gray-500'>{collection?.likes_count}</span> */}
                        </div>
                    </div>

                    <p className='mt-2 text-gray-700'><div dangerouslySetInnerHTML={{ __html: collection?.content.body }} /></p>
                </div>
            ))}
        </div>
    )
}   

MyCollections.layout = (page: any) => <DefaultLayout children={page} />
export default MyCollections
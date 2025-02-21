// import { router, useForm } from '@inertiajs/react'
// import { ReactTrixRTEInput } from 'react-trix-rte'
import PostType from '../../types/serializers/Post'
import { Input } from '@/components/forms/motion-input'
import { Label } from '@/components/forms/motion-label'
import { TextareaInput } from '@/components/ui/textarea-with-characters-left'
import LabelInputContainer from '@/components/ui/label-input-container'
import BottomGradient from '@/components/ui/bottom-gradient'
import { useCreation, useSafeState } from 'ahooks'
import { AutoComplete, type Option } from '@/components/ui/autocomplete'
import CategoryType from '../../types/serializers/Category'
import { Button } from '@/components/ui/button'
import { KeysWithStringValues } from '@/types/utilityTypes'
import { ReactElement, useEffect } from 'react'
import useFormHandler from '@/hooks/useFormHandler'
import QuickActionsFloatingPanel from './components/QuickActionsFloatingPanel'
import PostCoverShow from '@/components/pages/post/PostCoverShow'
import { Deferred } from '@inertiajs/react'
import TailwindAdvancedEditor from '@/components/editor/advanced-editor'
// import { JSONContent } from 'novel'

export default function Form({ post, categories = [], submitText, post_cover_url, postUrl, patchUrl }: { post: PostType, submitText: string, categories?: CategoryType[], post_cover_url?: string, postUrl?: string, patchUrl?: string, }) {
  // const factory = useCreation(
  //   () => ({
  //     content: ''
  //   }),
  //   []
  // )
  const {
    data,
    processing,
    updateField,
    submit,
    errors,
    setData,
    transform,
  } = useFormHandler<PostType>({
    initialData: {
      id: post.id || '',
      title: post.title || '',
      body: post.body || '',
      category_id: post.category_id,
      sub_title: post.sub_title || '',
      content: post.content || '',
      created_at: post.created_at || '',
      updated_at: post.updated_at || '',
      status: post.status || ''
    },
    postUrl: postUrl,
    patchUrl: patchUrl,
    onSuccess: () => {
    }
  })

  const [item, setItem] = useSafeState<Option | undefined>()
  const [showSubTitle, setShowSubTitle] = useSafeState(false)

  const handleSubmit = (e) => {
    transform((data: PostType) => ({ ...data, category_id: item?.value, status: data.status === 'draft' ? 0 : 1 }))
    submit(e)
  }

  const addSubTitle = () => {
    setShowSubTitle(true)
  }

  useEffect(() => {
    if (categories.length === 0) return
    const found = categories.find(f => f.id === data.category_id)
    if (found) {
      setItem({ label: found.name, value: found.id.toString() })
    }
  }, [])

  useEffect(() => {
    setShowSubTitle(true)
  }, [post.id])

  const renderTextInput = (
    type: string,
    id: KeysWithStringValues<PostType>,
    placeholder: string
  ): ReactElement => {
    return (
      <Input id={id} placeholder={placeholder} type={type} name={id} value={data[id]} onChange={(e) => updateField(id, e.target.value)} error={errors[id]} />
    )
  }

  // const [value, setValue] = useSafeState<JSONContent>([]);
  // console.log(value);

  return (
    <>
      <div className='flex items-center justify-start w-full mb-4'>
        {post_cover_url ? <PostCoverShow postCoverUrl={post_cover_url} postId={post.id} /> : <QuickActionsFloatingPanel postId={post.id} postCoverUrl={post_cover_url} />}
        <Button variant='outline' onClick={() => addSubTitle()}>添加副标题</Button>
      </div>
      <form onSubmit={handleSubmit} className='contents'>
        {showSubTitle &&
          <div className='flex items-center justify-start w-full mb-4'>
            <div className='w-4/5'>
              {renderTextInput('text', 'sub_title' as KeysWithStringValues<PostType>, '副标题')}
            </div>
            <button type='button' onClick={() => setShowSubTitle(false)} className='w-1/5 ml-2'>
              <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>}
        <div className='flex items-center justify-start w-full mb-4'>
          <div className='w-1/3'>
            <div className='flex flex-col gap-4 not-prose'>
              <Deferred data="categories" fallback={<div>Loading...</div>}>
                <AutoComplete
                  options={categories.map(v => ({ label: v.name, value: v.id.toString() })) ?? []}
                  emptyMessage='没有结果.'
                  placeholder='选择话题或输入关键字查询'
                  onValueChange={setItem}
                  value={item}
                />
              </Deferred>
            </div>
          </div>
          <div className='w-2/3'>
            <LabelInputContainer>
              {renderTextInput('text', 'title' as KeysWithStringValues<PostType>, '在这里输入标题')}
            </LabelInputContainer>
          </div>
        </div>

        <div className='my-5'>
          <Label htmlFor='body'>概述</Label>
          <TextareaInput
            name='body'
            id='body'
            value={data.body}
            rows={1}
            maxLength={180}
            className='block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none'
            onChange={(e) => setData?.('body', e.target.value)}
          />
          {errors.body && (
            <div className='px-3 py-2 font-medium text-red-500'>
              {errors.body.join(', ')}
            </div>
          )}
        </div>

        {/* <div className='my-5'>
          <label htmlFor='body'>正文</label>
          <ReactTrixRTEInput
            name='content'
            id='content'
            defaultValue={post?.content?.body}
            isRailsDirectUpload
            onChange={(_, newValue: string) => {
              factory.content = newValue
            }}
          />
        </div> */}
        <div className='my-5'>
          <label htmlFor='body'>正文</label>
          <TailwindAdvancedEditor
            initialValue={
              post?.content
                ? typeof post.content === 'string'
                  ? JSON.parse(post.content)
                  : post.content
                : {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [{ type: 'text', text: '' }]
                    }
                  ]
                }
            }
            onChange={setData}
          />
        </div>

        <div className='inline'>
          <button
            type='submit'
            disabled={processing}
            className='inline-block px-5 py-3 font-medium text-white bg-blue-600 rounded-lg cursor-pointer'
          >
            {submitText}
            <BottomGradient />
          </button>
        </div>
      </form>
    </>
  )
}

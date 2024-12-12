import { useForm } from '@inertiajs/react'
import { ReactTrixRTEInput } from "react-trix-rte";
import PostType from '../../types/serializers/Post';
import { Input } from "@/components/ui/motion-input";
import { Label } from "@/components/ui/motion-label";
import { TextareaInput } from "@/components/ui/textarea-with-characters-left";
import LabelInputContainer from "@/components/ui/label-input-container";
import BottomGradient from "@/components/ui/bottom-gradient";
import { useCreation, useSafeState } from 'ahooks';
import { AutoComplete, type Option } from "@/components/ui/autocomplete";
import CategoryType from '../../types/serializers/Category'

export default function Form({ post, categories, onSubmit, submitText }: { post: PostType, categories?: CategoryType[], onSubmit: (form: any, categoryId: string | undefined, content?: string) => void, submitText: string }) {
  const factory = useCreation(
    () => ({
      content: '',
    }),
    [],
  );
  const form = useForm({
    title: post.title || '',
    body: post.body || ''
  })

  const [item, setItem] = useSafeState<Option | undefined>()

  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form, item?.value, factory.content)
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="flex items-center justify-start w-full mb-4">
        <div className="w-1/3">
          <div className="flex flex-col gap-4 not-prose">
            <AutoComplete
              options={categories?.map(v => ({ label: v.name, value: v.id })) || []}
              emptyMessage="没有结果."
              placeholder="选择话题或输入关键字查询"
              onValueChange={setItem}
              value={item}
            />
          </div>
        </div>
        <div className="w-2/3 ml-4">
          <LabelInputContainer>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder='在这里输入标题'
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            {errors.title && (
              <div className="px-3 py-2 font-medium text-red-500">
                {errors.title.join(', ')}
              </div>
            )}
          </LabelInputContainer>
        </div>
      </div>

      <div className="my-5">
        <Label htmlFor="body">概述</Label>
        <TextareaInput
          name="body"
          id="body"
          value={data.body}
          rows={1}
          maxLength={180}
          className="block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none"
          onChange={(e) => setData('body', e.target.value)}
        />
        {errors.body && (
          <div className="px-3 py-2 font-medium text-red-500">
            {errors.body.join(', ')}
          </div>
        )}
      </div>

      <div className="my-5">
        <label htmlFor="body">正文</label>
        <ReactTrixRTEInput
          name="content"
          id="content"
          defaultValue={post?.content?.body}
          isRailsDirectUpload={true}
          onChange={(_, newValue: string) => {
            factory.content = newValue
          }}
        />
      </div>

      <div className="inline">
        <button
          type="submit"
          disabled={processing}
          className="inline-block px-5 py-3 font-medium text-white bg-blue-600 rounded-lg cursor-pointer"
        >
          {submitText}
          <BottomGradient />
        </button>
      </div>
    </form>
  )
}

import { useForm } from '@inertiajs/react'
import { ReactTrixRTEInput } from "react-trix-rte";
import PostType from '../../types/serializers/Post';
import { Input } from "@/components/ui/motion-input";
import { Label } from "@/components/ui/motion-label";
import LabelInputContainer from "@/components/ui/label-input-container";
import BottomGradient from "@/components/ui/bottom-gradient";
import { useCreation } from 'ahooks';

export default function Form({ post, onSubmit, submitText }: { post: PostType, onSubmit: (form: any, content: string) => void, submitText: string }) {
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

  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form, factory.content)
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <LabelInputContainer className="mb-4">
        <Label htmlFor="title">标题</Label>
        <Input
          type="text"
          name="title"
          id="title"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
        />
        {errors.title && (
          <div className="px-3 py-2 font-medium text-red-500">
            {errors.title.join(', ')}
          </div>
        )}
      </LabelInputContainer>

      <div className="my-5">
        <label htmlFor="body">概述</label>
        <textarea
          name="body"
          id="body"
          value={data.body}
          rows="4"
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

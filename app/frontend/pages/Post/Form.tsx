import { useForm } from '@inertiajs/react'
import { ReactTrixRTEInput } from "react-trix-rte";

export default function Form({ post, onSubmit, submitText }) {
  const form = useForm({
    title: post.title || '',
    body: post.body || '',
    content: post.content || '',
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="my-5">
        <label htmlFor="title">标题</label>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          className="block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none"
          onChange={(e) => setData('title', e.target.value)}
        />
        {errors.title && (
          <div className="px-3 py-2 font-medium text-red-500">
            {errors.title.join(', ')}
          </div>
        )}
      </div>

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
          defaultValue={data.content.body}
          isRailsDirectUpload={true}
          onChange={(event, newValue: string) => { setData('content', newValue) }}
        />
      </div>

      <div className="inline">
        <button
          type="submit"
          disabled={processing}
          className="inline-block px-5 py-3 font-medium text-white bg-blue-600 rounded-lg cursor-pointer"
        >
          {submitText}
        </button>
      </div>
    </form>
  )
}

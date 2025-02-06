import React, { useEffect, useState } from 'react'
import { TracingBeam } from '@/components/ui/tracing-beam'

export default function Post ({ post }) {
  console.log("🚀 ~ Post ~ post:", post)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const regex = /url\s*=\s*["'](.+?)["']/g
    const match = regex.exec(post.content.body)
    if (match !== null) {
      setImageUrl(match[1])
    }
  }, [])

  const dummyContent = [
    {
    title: post.sub_title,
    description: (
      <>
        <p>{post.body}</p>
        </>
        ),
    badge: post.title,
    image: post.post_cover_url
  },
  {
    title: post.updated_at,
    description: (
      <>
        <p></p>
        </>
        ),
    badge: post.created_at,
    image: ''
  },
  {
    title: '',
    description: post.content.body,
    badge: '',
    image: ''
  },
]
  return (
    <TracingBeam className="px-6">
    <div className="relative max-w-2xl pt-4 mx-auto antialiased">
      {dummyContent.map((item, index) => (
        <div key={`content-${index}`} className="mb-10">
          <h2 className="px-4 py-1 mb-4 text-sm text-white bg-black rounded-full w-fit">
            {item.badge}
          </h2>

          <p className="mb-4 text-xl">
            {item.title}
          </p>

          <div className="text-sm prose-sm prose dark:prose-invert">
            {item?.image && (
              <img
                src={item.image}
                alt="blog thumbnail"
                height="1000"
                width="1000"
                className="object-cover mb-10 rounded-lg"
              />
            )}
            {index === 2? <div dangerouslySetInnerHTML={{ __html: item.description }} /> : item.description}
          </div>
        </div>
      ))}
    </div>
  </TracingBeam>
  )
}

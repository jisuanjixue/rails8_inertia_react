import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

export default function Post({ post }) {
const [imageUrl, setImageUrl] = useState('')

useEffect(() => {
  const regex = /url\s*=\s*["'](.+?)["']/g;
  const match = regex.exec(post.content.body);
  if(match !== null){
    setImageUrl(match[1])
  }
 }, [])

  return (
    <Card className="shadow-xl bg-base-100">
      <div className="p-6">
        <h2 className="mb-2 text-xl font-bold">标题</h2>
        <p className="mb-4">{post.title}</p>

        <h3 className="mb-2 text-lg font-semibold">概述</h3>
        <p>{post.body}</p>
        <h3 className="mb-2 text-lg font-semibold">正文</h3>
        <div dangerouslySetInnerHTML={{ __html: post.content.body }} />

       <img className="h-auto max-w-full" src={imageUrl} alt="image description" />
      </div>
    </Card>
  )
}

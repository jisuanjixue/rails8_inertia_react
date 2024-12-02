import { Link, Head, router } from '@inertiajs/react'
// import { Fragment } from 'react'
// import Post from './Post'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  IconBoxAlignRightFilled
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import DefaultLayout from '../DefaultLayout'
import PostType from '../../types/serializers/Post'
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import Demo from './demo'


const PostIndex = ({ posts, flash }: { posts: PostType[], flash: any }) => {
  const SkeletonFive = (item) => {
    const variants = {
      initial: {
        x: 0,
      },
      animate: {
        x: 10,
        rotate: 5,
        transition: {
          duration: 0.2,
        },
      },
    };
    const variantsSecond = {
      initial: {
        x: 0,
      },
      animate: {
        x: -10,
        rotate: -5,
        transition: {
          duration: 0.2,
        },
      },
    };

    return (
      <motion.div
        initial="initial"
        whileHover="animate"
        className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
      >
        <motion.div
          variants={variants}
          className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
        >
          <img
            src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
            alt="avatar"
            height="100"
            width="100"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-xs text-neutral-500">
            There are a lot of cool framerworks out there like React, Angular,
            Vue, Svelte that can make your life ....
          </p>
        </motion.div>
        <motion.div
          variants={variantsSecond}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
        >
          <p className="text-xs text-neutral-500">Use PHP.</p>
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        </motion.div>
      </motion.div>
    );
  };
  return (
    <div className='relative flex flex-col items-start justify-start min-h-screen mt-8'>
      <Head title="Posts" />
      <div className="w-full px-8 pt-8 mx-auto md:w-2/3">
        {flash.notice && (
          <Card className="p-3 mb-4 rounded-lg bg-green-50">
            <p className="text-sm">{flash.notice}</p>
          </Card>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">文章</h1>
          <Link
            href="/posts/new"
            className='px-5 py-3'
          >
            <Button variant="destructive">
              创建
            </Button>
          </Link>
        </div>

        <div className="min-w-full">
        <Demo />
        {/* <HoverEffect  /> */}
          <BentoGrid>
            {posts.map((item, i) => (
              <div onClick={() => router.get(`/posts/${item.id}`)}>
              <BentoGridItem
                key={i}
                title={item.title}
                description={<span className="text-sm">
                  {item.body}
                </span>}
                header={SkeletonFive(item)}
                className={cn("[&>p:text-lg]", 'md:col-span-1')}
                icon={<IconBoxAlignRightFilled className="w-4 h-4 text-neutral-500" />}
              />
              </div>
            ))}
          </BentoGrid>
          {/* {posts.map((post) => (
            <Fragment key={post.id}>
              <Post post={post} />
              <p className="my-5">
                <Link
                  href={`/posts/${post.id}`}
                  className='py-3 pr-5 ml-2'
                >
                  <Button variant="outline">
                    详情
                  </Button>
                </Link>
              </p>
            </Fragment>
          ))} */}
        </div>
      </div>
    </div>
  )
}

PostIndex.layout = (page: any) => <DefaultLayout children={page} />
export default PostIndex
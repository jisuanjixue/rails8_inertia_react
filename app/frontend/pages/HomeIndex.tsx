import React, { useCallback, useEffect, useRef } from 'react'
import DefaultLayout from './DefaultLayout'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'
import { WobbleCard } from '@/components/ui/wobble-card'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { motion, useAnimation } from 'motion/react'
import { useInViewport } from 'ahooks'

// 标题文字数组
const titleWords = [
  {
    text: '免费',
    className: 'text-white'
  },
  {
    text: '创建',
    className: 'text-white'
  },
  {
    text: '好用',
    className: 'text-white'
  },
  {
    text: '的',
    className: 'text-white'
  },
  {
    text: '博客.',
    className: 'text-blue-500 dark:text-blue-500'
  }
]

// 特性卡片组件
const FeatureCard = ({
  title,
  description,
  className,
  delay = 0
}: {
  title: string;
  description: string;
  className: string;
  delay?: number;
}) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [inView] = useInViewport(ref, {
    threshold: 0.1
  })

  // 使用 useRef 来跟踪元素是否已经显示过
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      // 设置标志，确保动画只触发一次
      hasAnimated.current = true

      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: delay
        }
      })
    }
  }, [controls, inView, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
    >
      <WobbleCard containerClassName={className}>
        <div className="max-w-xs md:max-w-sm">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            {title}
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            {description}
          </p>
        </div>
      </WobbleCard>
    </motion.div>
  )
}

const HomeIndex = () => {
  // 使用 useCallback 优化事件处理函数
  const handleCreateClick = useCallback(() => {
    router.get('/posts/new')
  }, [])

  const handleExampleClick = useCallback(() => {
    router.get('/posts')
  }, [])

  return (
    <>
      {/* 英雄区域 */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] bg-black px-4">
        <motion.div
          className="max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TypewriterEffectSmooth words={titleWords} />
          <motion.p
            className="mt-6 text-lg text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            现代博客需要现代工具，创建属于你自己的博客。
          </motion.p>
          <motion.div
            className="flex flex-col mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <Button
              className="px-8 py-3 text-sm font-medium text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={handleCreateClick}
            >
              立即创作
            </Button>
            <Button
              className="px-8 py-3 text-sm font-medium text-white transition-colors duration-300 border border-white rounded-lg hover:bg-white/10"
              onClick={handleExampleClick}
            >
              查看示例
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 特性区域 */}
      <section className="grid w-full grid-cols-1 gap-4 px-4 mx-auto mb-10 bg-black lg:grid-cols-3 max-w-7xl">
        <FeatureCard
          title="强大的编辑器体验"
          description="丰富的编辑工具，支持 Markdown、富文本和图片拖放，让你的创作过程更加流畅。"
          className="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-pink-800 to-purple-900 min-h-[300px] lg:min-h-[300px]"
          delay={0}
        />
        <FeatureCard
          title="SEO 优化"
          description="内置 SEO 工具，帮助你的内容被更多人发现。"
          className="col-span-1 min-h-[300px] bg-gradient-to-br from-gray-900 to-black"
          delay={0.2}
        />
        <FeatureCard
          title="数据分析与洞察"
          description="了解你的读者，分析内容表现，获取有价值的洞察，帮助你创作更受欢迎的内容。"
          className="col-span-1 lg:col-span-3 bg-gradient-to-br from-blue-900 to-indigo-900 min-h-[300px] lg:min-h-[300px] xl:min-h-[300px]"
          delay={0.4}
        />
      </section>
    </>
  )
}

HomeIndex.layout = (page: any) => <DefaultLayout children={page} />
export default HomeIndex

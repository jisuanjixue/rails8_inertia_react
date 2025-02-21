
import DefaultLayout from './DefaultLayout'
import { WobbleCard } from '@/components/ui/wobble-card'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

const HomeIndex = () => {
  const words = [
    {
      text: '免费',
      className: 'text-white'  // 添加白色文字
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
      text: '的11',
      className: 'text-white'
    },
    {
      text: '博客.',
      className: 'text-blue-500 dark:text-blue-500'
    }
  ]

  const AnimatedMapRender = () => {
    return (
      <div className="w-full py-40 bg-white dark:bg-black">
        <div className="mx-auto text-center max-w-7xl">
          <p className="text-xl font-bold text-black md:text-4xl dark:text-white">
            Remote{" "}
            <span className="text-neutral-400">
              {"Connectivity".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </p>
          <p className="max-w-2xl py-4 mx-auto text-sm md:text-lg text-neutral-500">
            Break free from traditional boundaries. Work from anywhere, at the
            comfort of your own studio apartment. Perfect for Nomads and
            Travellers.
          </p>
        </div>
        <WorldMap
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </div>
    );
  }

  const AnimatedTestimonialsRender = () => {
    const testimonials = [
      {
        quote: "简洁的编辑器让写作变得轻松愉快，再也不用担心排版问题。",
        name: "张伟",
        designation: "技术博主",
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote: "自动保存功能太棒了，再也不用担心文章丢失。",
        name: "李娜",
        designation: "旅行博主",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote: "多设备同步功能让我随时随地都能继续写作。",
        name: "王强",
        designation: "美食博主",
        src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote: "SEO优化建议功能帮助我的文章获得了更多曝光。",
        name: "陈静",
        designation: "时尚博主",
        src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote: "数据分析功能让我更了解读者的喜好。",
        name: "刘洋",
        designation: "科技博主",
        src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ];
    return <AnimatedTestimonials testimonials={testimonials} />;
  }


  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-[60vh] bg-black'>
        <div className='max-w-4xl text-center'>
          <TypewriterEffectSmooth words={words} />
          <p className='mt-6 text-lg text-neutral-300'>
            现代博客需要现代工具,创建属于你自己的博客。
          </p>
          <div className='flex flex-col mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center'>
            <Button className='px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700' onClick={() => router.get('/posts/new')}>
              立即创作121
            </Button>
            <Button className='px-8 py-3 text-sm font-medium text-white border border-white rounded-lg hover:bg-white/10'>
              查看示例
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='grid w-full grid-cols-1 gap-4 mx-auto mb-10 bg-black lg:grid-cols-3 max-w-7xl'>
        <WobbleCard
          containerClassName='col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]'
        >
          <div className='max-w-xs'>
            <h2 className='text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
              Gippity AI powers the entire universe
            </h2>
            <p className='mt-4 text-left text-base/6 text-neutral-200'>
              With over 100,000 mothly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
        </WobbleCard>
        <WobbleCard containerClassName='col-span-1 min-h-[300px] bg-black'>
          <h2 className='max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
            No shirt, no shoes, no weapons.
          </h2>
          <p className='mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200'>
            If someone yells “stop!”, goes limp, or taps out, the fight is over.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName='col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]'>
          <div className='max-w-sm'>
            <h2 className='max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
              Signup for blazing-fast cutting-edge state of the art Gippity AI
              wrapper today!
            </h2>
            <p className='mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200'>
              With over 100,000 mothly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
        </WobbleCard>
      </div>

      <div className='bg-black'>
        <AnimatedMapRender />
      </div>
      <div className='bg-black'>
        <AnimatedTestimonialsRender />
      </div>

    </>
  )
}
HomeIndex.layout = (page: any) => <DefaultLayout children={page} />
export default HomeIndex

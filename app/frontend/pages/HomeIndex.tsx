
import DefaultLayout from './DefaultLayout'
import { WobbleCard } from '@/components/ui/wobble-card'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'

const HomeIndex = () => {
  const words = [
    {
      text: 'Build',
      className: 'text-white'  // 添加白色文字
    },
    {
      text: 'awesome',
      className: 'text-white'
    },
    {
      text: 'blog',
      className: 'text-white'
    },
    {
      text: 'with',
      className: 'text-white'
    },
    {
      text: 'free.',
      className: 'text-blue-500 dark:text-blue-500'
    }
  ]

  const AnimatedTestimonialsRender = () => {
    const testimonials = [
      {
        quote:
          "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
        name: "Sarah Chen",
        designation: "Product Manager at TechFlow",
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote:
          "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
        name: "Michael Rodriguez",
        designation: "CTO at InnovateSphere",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote:
          "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
        name: "Emily Watson",
        designation: "Operations Director at CloudScale",
        src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote:
          "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
        name: "James Kim",
        designation: "Engineering Lead at DataPro",
        src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote:
          "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
        name: "Lisa Thompson",
        designation: "VP of Technology at FutureNet",
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
            Modern blogging deserves modern tools. Build, collaborate, and grow with Gippity AI.
          </p>
          <div className='flex flex-col mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center'>
            <button className='px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
              开始写作
            </button>
            <button className='px-8 py-3 text-sm font-medium text-white border border-white rounded-lg hover:bg-white/10'>
              立即注册
            </button>
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
            <AnimatedTestimonialsRender />
          </div>
       
    </>
  )
}
HomeIndex.layout = (page: any) => <DefaultLayout children={page} />
export default HomeIndex

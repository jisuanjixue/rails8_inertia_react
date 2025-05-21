import Header from '@/components/Header'
// import Footer from '@/components/Footer'
import { Footer } from "@/components/ui/footer-section";
import { usePage } from '@inertiajs/react'
import { ShootingStars } from '@/components/ui/shooting-stars'
// import { Monitoring } from "react-scan/monitoring";
import { StarsBackground } from '@/components/ui/stars-background'
import { Toaster } from '@/components/ui/toaster'
import { useEffect } from 'react'
import { toast } from '@/hooks/use-toast'
import { ThemeProvider } from 'next-themes';
import AiMessage from './AiMessage'
interface Flash {
  alert: string | undefined
  notice: string | undefined
}

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const { flash } = usePage().props as unknown as { flash: Flash }
  useEffect(() => {
    if (flash.alert) {
      toast({
        variant: 'destructive',
        title: '错误消息',
        description: flash.alert
      })
    }
    if (flash.notice) {
      toast({
        title: '警告消息',
        description: flash.notice
      })
    }
  }, [flash])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <div className='inset-0 z-auto flex flex-col w-full h-full min-h-screen overflow-hidden bg-black'>
      <StarsBackground />
      <ShootingStars />
      <Header />
      <main className='flex flex-col flex-grow mt-8 overflow-y-auto'>
        <div className='container flex items-center justify-center flex-grow mx-auto'>
          <div className='relative flex-grow w-full max-w-full px-4 py-8 mx-auto md:px-6 lg:px-8'>
            {children}
          </div>
        </div>
        <Toaster />
      </main>
      <Footer />
      <AiMessage></AiMessage>
    </div>
    </ThemeProvider>
  )
}
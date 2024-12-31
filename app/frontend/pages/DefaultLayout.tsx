import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { usePage } from '@inertiajs/react'
import { AlertCircle } from 'lucide-react'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'
import { Toaster } from '@/components/ui/toaster'

interface Flash {
  alert: string | undefined
  notice: string | undefined
}

export default function DefaultLayout ({ children }: { children: React.ReactNode }) {
  const { flash } = usePage().props as unknown as { flash: Flash }
  return (
    <div className='inset-0 z-auto flex flex-col w-full h-full min-h-screen overflow-hidden bg-black'>
      <ShootingStars />
      <StarsBackground />
      <Header />
      <main className='flex flex-col flex-grow overflow-y-auto'>
        <div className='container flex items-center justify-center flex-grow mx-auto'>
          {flash.alert &&
            <Alert variant='destructive' className='mb-4'>
              <AlertCircle className='w-4 h-4' />
              <AlertTitle>错误消息</AlertTitle>
              <AlertDescription>
                {flash.alert}
              </AlertDescription>
            </Alert>}
          {flash.notice &&
            <Alert className='mb-4'>
              <AlertTitle>警告消息</AlertTitle>
              <AlertDescription>
                {flash.notice}
              </AlertDescription>
            </Alert>}
          <div className='relative flex-grow w-full max-w-6xl px-4 py-8 mx-auto md:px-8'>
            {children}
          </div>
        </div>
        <Toaster />
      </main>
      <Footer />
    </div>
  )
}

import Header from '@/components/Header'
import { Footer } from "@/components/ui/footer-section"
import { usePage } from '@inertiajs/react'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'
import { Toaster } from '@/components/ui/toaster'
import { useEffect, memo, Suspense } from 'react'
import { toast } from '@/hooks/use-toast'
import { ThemeProvider } from 'next-themes'
import AiMessage from './AiMessage'
import ErrorBoundary from '@/components/ErrorBoundary'

// Define Flash interface for type safety
interface Flash {
  alert: string | undefined
  notice: string | undefined
}

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px]">
    <div className="w-12 h-12 border-4 border-t-4 rounded-full border-neutral-700 border-t-blue-500 animate-spin"></div>
  </div>
)

// Main layout component
function DefaultLayout({ children }: { children: React.ReactNode }) {
  const { flash } = usePage().props as unknown as { flash: Flash }

  // Handle flash messages
  useEffect(() => {
    if (flash?.alert) {
      toast({
        variant: 'destructive',
        title: '错误消息',
        description: flash.alert
      })
    }
    if (flash?.notice) {
      toast({
        title: '警告消息',
        description: flash.notice
      })
    }
  }, [flash])

  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className='flex overflow-hidden inset-0 z-auto flex-col w-full h-full min-h-screen bg-black'>
          {/* Background elements */}
          <StarsBackground />
          <ShootingStars />

          {/* Header */}
          <Header />

          {/* Main content */}
          <main className='flex overflow-y-auto flex-col flex-grow mt-8'>
            <div className='container flex flex-grow justify-center items-center mx-auto'>
              <div className='relative flex-grow px-4 py-8 mx-auto w-full max-w-full md:px-6 lg:px-8'>
                <Suspense fallback={<LoadingFallback />}>
                  {children}
                </Suspense>
              </div>
            </div>
            <Toaster />
          </main>

          {/* Footer */}
          <Footer />

          {/* AI Message component */}
          <AiMessage />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

// Export memoized component to prevent unnecessary re-renders
export default memo(DefaultLayout)

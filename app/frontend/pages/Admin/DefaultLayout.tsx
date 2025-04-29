import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { usePage } from '@inertiajs/react'
import { toast } from '@/hooks/use-toast'
import { useEffect, memo, Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
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

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { flash } = usePage().props as unknown as { flash: Flash }

  // Handle flash messages with proper null checking
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
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='h-4 mr-2' />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>
                      管理后台
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>数据管理</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className='flex flex-col flex-1 gap-4 p-4 pt-0'>
            <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
              <Suspense fallback={<LoadingFallback />}>
                {children}
              </Suspense>
            </div>
            <Toaster />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

// Export memoized component to prevent unnecessary re-renders
export default memo(DefaultLayout)

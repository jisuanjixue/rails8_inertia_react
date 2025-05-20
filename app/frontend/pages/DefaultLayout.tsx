import React, { useEffect, useState, Suspense, lazy, memo, useMemo } from 'react'
import { usePage } from '@inertiajs/react'
import { ThemeProvider } from 'next-themes'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useResponsive, useMount, useUnmount, useUpdateEffect } from 'ahooks'

// 组件导入
import Header from '@/components/Header'
import { Footer } from "@/components/ui/footer-section"
import { StarsBackground } from '@/components/ui/stars-background'
import { ShootingStars } from '@/components/ui/shooting-stars'

// 懒加载非关键组件
const AiMessage = lazy(() => import('./AiMessage'))

// 类型定义
interface Flash {
  alert: string | null | undefined
  notice: string | null | undefined
}

interface DefaultLayoutProps {
  children: React.ReactNode
}

// 加载状态组件
const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px]">
    <div className="w-12 h-12 border-4 border-t-4 rounded-full border-neutral-700 border-t-blue-500 animate-spin"></div>
  </div>
)

// 主布局组件
function DefaultLayout({ children }: DefaultLayoutProps) {
  // 获取页面属性
  const pageProps = usePage().props as { flash?: Flash }
  const flash = pageProps.flash || { alert: undefined, notice: undefined }

  // 状态管理
  const [isLoading, setIsLoading] = useState(true)

  // 使用 ahooks 的 useResponsive 钩子获取响应式信息
  const responsive = useResponsive()

  // 根据设备类型调整布局
  const layoutClasses = useMemo(() => ({
    mainPadding: responsive.sm ? 'px-3 py-4' : responsive.md ? 'px-5 py-6' : 'px-8 py-8',
    mainMargin: responsive.sm ? 'mt-2' : 'mt-4 md:mt-8',
  }), [responsive.sm, responsive.md])

  // 处理 Flash 消息 - 使用 useUpdateEffect 避免首次渲染时触发
  useUpdateEffect(() => {
    if (flash.alert) {
      toast({
        variant: 'destructive',
        title: '错误消息',
        description: flash.alert
      })
    }
  }, [flash.alert])

  // 分开处理不同类型的消息，提高可维护性
  useUpdateEffect(() => {
    if (flash.notice) {
      toast({
        title: '提示消息',
        description: flash.notice
      })
    }
  }, [flash.notice])

  // 使用 useMount 钩子处理组件挂载逻辑
  useMount(() => {
    // 模拟页面加载完成
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    // 注册清理函数
    useUnmount(() => {
      clearTimeout(timer)
    })
  })

  // 预加载 AiMessage 组件
  useEffect(() => {
    // 当主内容加载完成后，预加载 AiMessage 组件
    if (!isLoading) {
      const preloadAiMessage = setTimeout(() => {
        // 动态导入 AiMessage 组件，但不渲染
        import('./AiMessage').catch(err => {
          console.error('Failed to preload AiMessage component:', err)
        })
      }, 2000) // 延迟 2 秒预加载，优先加载主要内容

      return () => clearTimeout(preloadAiMessage)
    }
  }, [isLoading])

  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="inset-0 z-auto flex flex-col w-full h-full min-h-screen overflow-hidden bg-black">
          {/* 背景元素 */}
          <StarsBackground />
          <ShootingStars />

          {/* 页面头部 */}
          <Header />

          {/* 主内容区域 */}
          <main className={`flex flex-col flex-grow overflow-y-auto ${layoutClasses.mainMargin}`}>
            <div className="container flex items-center justify-center flex-grow mx-auto">
              <div className={`relative flex-grow w-full max-w-full mx-auto ${layoutClasses.mainPadding}`}>
                {isLoading ? (
                  <LoadingFallback />
                ) : (
                  <ErrorBoundary>
                    {children}
                  </ErrorBoundary>
                )}
              </div>
            </div>
            <Toaster />
          </main>

          {/* 页面底部 */}
          <Footer />

          {/* 懒加载 AI 消息组件 */}
          <Suspense fallback={null}>
            <AiMessage />
          </Suspense>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

// 使用 memo 优化组件，避免不必要的重渲染
export default memo(DefaultLayout)

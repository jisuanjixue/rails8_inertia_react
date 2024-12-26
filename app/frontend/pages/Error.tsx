import { router } from '@inertiajs/react'
import { useCountDown } from 'ahooks'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'

const App: React.FC = ({ status }: { status: string | undefined }) => {
  const [countdown, formattedRes] = useCountDown({ leftTime: 10 * 1000 })
  const { seconds } = formattedRes

  useEffect(() => {
    if (countdown === 0) {
      router.get('/')
    }
  }, [countdown])

  const handBack = () => {
    router.get('/')
  }
  return (
    <div className='grid h-screen px-4 bg-white place-content-center'>
      <div className='text-center'>
        <h1 className='font-black text-gray-200 text-9xl'>{status}</h1>

        <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Uh-oh!</p>

        <p className='mt-4 text-gray-500'>{`${seconds}秒后跳到统计分析页面`}</p>

        <Button onClick={() => handBack()}>
          返回首页
        </Button>
      </div>
    </div>
  )
}

export default App

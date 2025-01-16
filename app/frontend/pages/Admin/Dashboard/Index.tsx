import DefaultLayout from '../DefaultLayout'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import PostType from '../../../types/serializers/Post'

const DashboardIndex = ({ posts }: { posts: PostType[] }) => {
  // 按月份统计帖子数量
  const postCounts = posts.reduce((acc, post) => {
    const date = new Date(post.created_at)
    const month = date.toLocaleString('zh-CN', { month: 'long' }) // 使用中文月份
    
    if (!acc[month]) {
      acc[month] = { published: 0, draft: 0 }
    }
    
    // 由于你的数据中所有status都是draft，这里做个兼容
    if (post.status === 'published') {
      acc[month].published += 1
    } else {
      acc[month].draft += 1
    }
    
    return acc
  }, {} as Record<string, { published: number; draft: number }>)

  // 生成图表数据，按月份排序
  const chartData = Object.entries(postCounts)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([month, counts]) => ({
      month,
      ...counts
    }))

  const chartConfig = {
    published: {
      label: '已发布',
      color: '#2563eb'
    },
    draft: {
      label: '草稿',
      color: '#60a5fa'
    }
  } satisfies ChartConfig

  return (
    <DefaultLayout>
      <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey='published' fill='var(--color-published)' radius={4} />
          <Bar dataKey='draft' fill='var(--color-draft)' radius={4} />
        </BarChart>
      </ChartContainer>
    </DefaultLayout>
  )
}

export default DashboardIndex

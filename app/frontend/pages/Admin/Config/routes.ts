import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal
} from 'lucide-react'
// This is sample data.
const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: '仪表盘',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: '用户分析',
          url: '/admin/dashboard'
        },
        {
          title: '文章分析',
          url: '/admin/posts/all_posts'
        },
        {
          title: 'Settings',
          url: '#'
        }
      ]
    },
    {
      title: '文章设置',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '分类',
          url: '/admin/categories'
        },
      ]
    },
    {
      title: '用户设置',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: '用户列表',
          url: '/admin/users'
        },
      ]
    },
    {
      title: '设置',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: '常规',
          url: '#'
        },
        {
          title: 'Team',
          url: '#'
        },
        {
          title: 'Billing',
          url: '#'
        },
        {
          title: 'Limits',
          url: '#'
        }
      ]
    }
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map
    }
  ]
}

export default data

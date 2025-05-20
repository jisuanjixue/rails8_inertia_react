# Blog Demo

A modern blog application built with Ruby on Rails 8, React 18, TypeScript, and Inertia.js. Features shadcn UI and Aceternity UI components with Tailwind CSS styling.

## Features

- Modern React 18 with TypeScript
- Server-side rendering with Inertia.js
- Beautiful UI with shadcn and Aceternity components
- Optimized performance with code splitting
- Responsive design for all devices
- Error boundary and error handling
- Form validation with Zod
- Image optimization
- SQLite database

## Lighthouse Performance Audit

![Lighthouse audit](lighthouse.png)

## Installation

Clone the repository:

```bash
git clone https://github.com/jisuanjixue/rails8_inertia_react.git
```

Setup (install dependencies, create and seed database):

```bash
cd rails8_inertia_react
bin/setup
```

Start the development server:

```bash
bin/dev
```

You're ready to go! Visit the blog demo in your browser at http://localhost:3100.

## Project Structure

```
app/
├── frontend/           # React frontend code
│   ├── components/     # Reusable UI components
│   ├── entrypoints/    # Application entry points
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── types/          # TypeScript type definitions
└── ...                 # Rails backend code
```

## Custom Hooks

The application includes several custom hooks to improve code reusability and maintainability:

- `useApi` - For handling API requests with loading and error states
- `useZodForm` - For form validation with Zod
- `useOptimizedImage` - For image optimization with lazy loading
- `useIsMobile` - For responsive design

## Performance Optimizations

- Code splitting with dynamic imports
- React.memo for component memoization
- Suspense and lazy loading for components
- Image optimization with lazy loading and blur-up effect
- Optimized Vite configuration for faster builds

## Running Tests

To run the system tests:

```bash
rails test:system
```

## Requirements

- Ruby 3.3.4
- Ruby on Rails 8
- Node.js 18+
- SQLite

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

中文版

整体架构
这个博客项目采用了现代的全栈架构，主要基于以下核心技术：

后端: Ruby on Rails 8
前端: React 18 + TypeScript + Inertia.js
数据库: SQLite
构建工具: Vite
项目采用了"服务端渲染 + 客户端水合"的架构模式，通过 Inertia.js 将 Rails 后端与 React 前端无缝连接，实现了单页应用(SPA)的用户体验，同时保留了传统服务端渲染的优势。

技术栈详解
后端技术
Ruby on Rails 8: 最新版本的 Rails 框架，提供了 MVC 架构、路由系统、ORM 和 API 支持
Inertia.js 后端适配器: 使 Rails 能够与 Inertia.js 前端协同工作
SQLite: 轻量级关系型数据库，适合开发和小型应用
ActionText: Rails 内置的富文本编辑器框架
ActiveStorage: Rails 内置的文件上传和存储解决方案
前端技术
React 18: 最新版本的 React，支持并发模式和 Suspense
TypeScript: 为 JavaScript 添加静态类型检查
Inertia.js: 连接前后端的桥梁，允许使用传统的服务端路由构建 SPA
Vite: 现代前端构建工具，提供快速的开发体验和优化的生产构建
Tailwind CSS: 实用优先的 CSS 框架
UI 组件库:
shadcn/ui: 基于 Radix UI 的高质量组件库
Aceternity UI: 提供现代化的 UI 组件和动画效果
Radix UI: 无样式、可访问性优先的组件原语
状态管理: 主要使用 React 的 Context API 和自定义 hooks
表单处理: 使用 Inertia.js 的表单处理和自定义 hooks
动画: 使用 Framer Motion 实现流畅的动画效果
数据可视化: 使用 Recharts 实现图表和数据可视化
开发工具与优化
TypeScript: 提供类型安全和更好的开发体验
ESLint & Prettier: 代码质量和格式化工具
Vite: 快速的开发服务器和优化的构建工具
错误处理: 自定义 ErrorBoundary 组件捕获前端错误
代码分割: 通过 Vite 的 manualChunks 配置优化加载性能
图像优化: 自定义 hooks 实现图像懒加载和优化
项目结构
项目遵循标准的 Rails 目录结构，但前端代码组织在 app/frontend 目录下：

数据流
用户请求流程:
用户访问 URL → Rails 路由 → 控制器处理 → Inertia 渲染 → React 组件展示
后续导航通过 Inertia.js 处理，只交换数据而非整个页面
数据获取:
初始数据通过 Inertia 的 props 从服务器传递给前端
后续数据更新通过 Inertia 的 visit/get/post 方法获取
状态管理:
页面级状态通过 React 组件状态管理
全局状态通过 React Context 和自定义 hooks 管理
表单状态通过 Inertia 的 useForm hook 管理
特色功能
现代 UI: 使用 shadcn/ui 和 Aceternity UI 实现现代化界面
响应式设计: 适配各种屏幕尺寸的设备
动画效果: 使用 Framer Motion 实现流畅的过渡和动画
富文本编辑: 使用 Rails ActionText 和 Trix 编辑器
文件上传: 使用 ActiveStorage 和 React Dropzone
数据可视化: 使用 Recharts 实现图表
暗色模式: 使用 next-themes 实现主题切换
AI 集成: 项目中包含 AI 聊天功能
性能优化
代码分割: 通过 Vite 的 manualChunks 配置将代码分割成更小的块
懒加载: 使用 React.lazy 和 Suspense 实现组件懒加载
图像优化: 自定义 hooks 实现图像懒加载和优化
缓存策略: 使用 HTTP 缓存和 localStorage 缓存
组件优化: 使用 React.memo 和 useMemo/useCallback 减少不必要的渲染
安全性
CSRF 保护: Rails 内置的 CSRF 保护
XSS 防护: React 的 JSX 转义和 Rails 的内置保护
认证: 使用 Rails 的认证系统
授权: 基于角色的访问控制
总结
这个博客项目展示了如何使用现代技术栈构建全功能的 Web 应用程序。它结合了 Ruby on Rails 的强大后端能力和 React 的灵活前端体验，通过 Inertia.js 将两者无缝连接。项目采用了多种现代前端技术和最佳实践，包括 TypeScript、Tailwind CSS、组件库和性能优化策略，为用户提供了流畅、响应式的体验。

这种架构特别适合需要丰富用户界面的全栈应用，同时又不想完全分离前后端的场景，为开发团队提供了良好的开发体验和代码组织结构。

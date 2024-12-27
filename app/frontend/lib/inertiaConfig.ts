import {  ReactNode } from 'react'

// import type { ResolvedComponent } from '@inertiajs/react'
// import Layout from '@/Layout'

interface ResolvedComponent { default: ReactNode, layout?: (page: ReactNode) => ReactNode }
export const getTitle = (title: string | null): string =>
  title ? `${title} | blog` : 'blog'

export const resolvePage = (name: string): ResolvedComponent => {
  const pages = import.meta.glob<ResolvedComponent>(
    '../pages/**/!(*.test).tsx',
    { eager: true }
  )
  const page = pages[`../pages/${name}.tsx`] 
  if (!page) {
    console.error(`Missing Inertia page component: '${name}.tsx'`)
  }
  return page
}

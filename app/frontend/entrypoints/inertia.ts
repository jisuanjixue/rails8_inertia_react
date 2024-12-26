import { createInertiaApp } from '@inertiajs/react'
import { createElement, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

interface ResolvedComponent { default: ReactNode, layout?: (page: ReactNode) => ReactNode }

createInertiaApp({
  // Set default page title
  // see https://inertia-rails.netlify.app/guide/title-and-meta
  //
  // title: title => title ? `${title} - App` : 'App',

  // Disable progress bar
  //
  // see https://inertia-rails.netlify.app/guide/progress-indicators
  // progress: false,

  resolve: (name) => {
    const pages = import.meta.glob<ResolvedComponent>('../pages/**/*.tsx', { eager: true })
    const page = pages[`../pages/${name}.tsx`]
    return page
  },

  title: title => (title ? `${title} - blog` : 'blog'),
  progress: {
    // The delay after which the progress bar will appear, in milliseconds...
    delay: 50,

    // Whether to include the default NProgress styles...
    includeCSS: true,

    // Whether the NProgress spinner will be shown...
    showSpinner: true
  },

  setup ({ el, App, props }) {
    const root = createRoot(el)

    root.render(createElement(App, props))
  }
})

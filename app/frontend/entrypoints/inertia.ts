import { createInertiaApp } from '@inertiajs/react'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { getTitle, resolvePage } from '@/lib/inertiaConfig'

if (document.querySelector('[data-page]')) {
createInertiaApp({
  // Disable progress bar
  //
  // see https://inertia-rails.netlify.app/guide/progress-indicators
  // progress: false,
 resolve: resolvePage,
  // resolve: (name) => {
  //   const pages = import.meta.glob<ResolvedComponent>('../pages/**/*.tsx', { eager: true })
  //   const page = pages[`../pages/${name}.tsx`]
  //   if (!page) {
  //     console.error(`Missing Inertia page component: '${name}.tsx'`)
  //   }
  //   return page
  // },
  // Set default page title
  // see https://inertia-rails.netlify.app/guide/title-and-meta
  title: getTitle,
  progress: {
    // The delay after which the progress bar will appear, in milliseconds...
    delay: 50,
    // Whether to include the default NProgress styles...
    includeCSS: true,
    // Whether the NProgress spinner will be shown...
    showSpinner: true
  },

  setup ({ el, App, props }) {
    if (el !== null && el !== undefined) {
      const root = createRoot(el)
        root.render(createElement(App, props))
    } else {
      console.error(
        'Missing root element.\n\n' +
          'If you see this error, it probably means you load Inertia.js on non-Inertia pages.\n' +
          "Consider moving <%= vite_typescript_tag 'inertia' %> to the Inertia-specific layout instead."
      )
    }
  }
})
}

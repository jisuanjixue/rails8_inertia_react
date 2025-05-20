import { createInertiaApp } from '@inertiajs/react'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { getTitle, resolvePage } from '@/lib/inertiaConfig'

if (document.querySelector('[data-page]')) {
createInertiaApp({
  // Disable progress bar
  // see https://inertia-rails.netlify.app/guide/progress-indicators
  // progress: false,
 resolve: resolvePage,
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
      if (el.dataset.serverRendered === 'true') {
        console.log('server rendered')
      } else {
        const root = createRoot(el)
        root.render(createElement(App, props))
      }
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

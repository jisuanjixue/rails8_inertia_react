import { createInertiaApp } from '@inertiajs/react'
import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getTitle, resolvePage } from '@/lib/inertiaConfig'

// Error boundary for the entire application
class ErrorBoundary {
  static handleError(error: Error): void {
    console.error('Application Error:', error)
    // You could also report to an error tracking service here
  }
}

// Only initialize Inertia if we're on an Inertia page
if (document.querySelector('[data-page]')) {
  createInertiaApp({
    resolve: resolvePage,
    title: getTitle,
    progress: {
      delay: 50,
      includeCSS: true,
      showSpinner: true,
      color: '#4B5563', // Tailwind gray-600
    },
    setup({ el, App, props }) {
      if (!el) {
        console.error(
          'Missing root element.\n\n' +
          'If you see this error, it probably means you load Inertia.js on non-Inertia pages.\n' +
          "Consider moving the Inertia script tag to the Inertia-specific layout instead."
        )
        return
      }

      try {
        // Check if server-side rendering is enabled
        if (el.dataset.serverRendered === 'true') {
          console.log('Server-side rendering detected')
          // Handle SSR hydration here if needed
        }

        // Create and render the React application
        const root = createRoot(el)

        // Wrap in StrictMode for additional development checks
        root.render(
          <StrictMode>
            {createElement(App, props)}
          </StrictMode>
        )
      } catch (error) {
        ErrorBoundary.handleError(error as Error)
      }
    }
  }).catch(error => {
    ErrorBoundary.handleError(error)
  })
}

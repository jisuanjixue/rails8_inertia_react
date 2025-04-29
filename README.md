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

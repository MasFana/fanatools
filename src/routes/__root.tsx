import { Outlet, createRootRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Header from '../components/Header'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>

        <Header />
        <div className='min-h-screen w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)]'>
          <Outlet />
        </div>
        <Footer />
        {/* <TanStackRouterDevtools /> */}
      </ThemeProvider>
    </>
  ),
})

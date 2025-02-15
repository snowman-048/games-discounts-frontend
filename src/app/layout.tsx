import { Box, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Analytics } from '@vercel/analytics/next'
import { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
import { Roboto } from 'next/font/google'

import { BackgroundHandler } from '@/components/background-handler'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { theme } from '@/theme'

import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Game Price Pulse',
    absolute: 'Game Price Pulse - Best Video Game Discounts and Deals',
  },
  description:
    'Discover the best video game discounts from PlayStation, Nintendo, and Xbox. Stay updated on price drops and exclusive deals to save on your favorite games!',
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <CookiesProvider>
            <ThemeProvider theme={theme} defaultMode="dark">
              <BackgroundHandler />
              <div id="root">
                <Header />
                <Box flex={1} width="100%" height="100%">
                  {children}
                </Box>
                <Footer />
              </div>
            </ThemeProvider>
          </CookiesProvider>
        </AppRouterCacheProvider>

        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout

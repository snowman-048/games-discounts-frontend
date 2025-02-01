import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { CookiesProvider } from 'next-client-cookies/server'
import { Roboto } from 'next/font/google'

import { BackgroundHandler } from '@/components/background-handler'
import { Header } from '@/components/header'
import { Container } from '@/components/ui/container'
import { theme } from '@/theme'

import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html>
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <CookiesProvider>
            <ThemeProvider theme={theme} defaultMode="dark">
              <BackgroundHandler />
              <div id="root">
                <Header />
                <Container>{children}</Container>
              </div>
            </ThemeProvider>
          </CookiesProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

export default RootLayout

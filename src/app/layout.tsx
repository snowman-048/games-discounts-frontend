import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'

import { Box, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
import { Roboto } from 'next/font/google'
import Script from 'next/script'

import { BackgroundHandler } from '@/components/background-handler'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { theme } from '@/theme'
import { UserHandler } from '@/utils/user-handler'

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
  other: {
    'google-adsense-account': process.env.NEXT_PUBLIC_AD_SENSE_ACCOUNT || '',
  },
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7096388850784019"
        crossOrigin="anonymous"
      />
      <body className={roboto.variable}>
        {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
            {!!process.env.NEXT_PUBLIC_GTAG && (
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG} />
            )}
          </>
        )}

        <AppRouterCacheProvider>
          <CookiesProvider>
            <ThemeProvider theme={theme} defaultMode="dark">
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!}>
                <BackgroundHandler />
                <UserHandler />
                <ToastContainer theme="dark" />

                <div id="root">
                  <Header />
                  <Box flex={1} width="100%" height="100%">
                    {children}
                  </Box>
                  <Footer />
                </div>
              </GoogleOAuthProvider>
            </ThemeProvider>
          </CookiesProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

export default RootLayout

import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'

import { Box, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import cn from 'classnames'
import { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
import { Dancing_Script, Roboto } from 'next/font/google'
import Script from 'next/script'

import { BackgroundHandler } from '@/components/background-handler'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { theme } from '@/theme'
import { InitHandler } from '@/utils/init-handler'

import './globals.css'

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

const dancingScript = Dancing_Script({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
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
      <Script
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        async
      />

      <body className={cn(roboto.variable, dancingScript.variable)}>
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
                <InitHandler />
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

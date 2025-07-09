import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'

import { Grid2, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import cn from 'classnames'
import { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Dancing_Script, Roboto } from 'next/font/google'
import Script from 'next/script'

import { BackgroundHandler } from '@/components/background-handler'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { setMomentLocale } from '@/helpers/setMomentLocale'
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
    'theme-color': '#111111',
  },
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const locale = await getLocale()
  setMomentLocale(locale)
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon512_maskable.png" />
      <link rel="icon" href="https://game-price-pulse.com/favicon.ico?v=2" />

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

      <Script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '2805887456250980'); fbq('track', 'PageView');`,
        }}
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

        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider>
            <CookiesProvider>
              <ThemeProvider theme={theme} defaultMode="dark">
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!}>
                  <BackgroundHandler />
                  <InitHandler locale={locale} />
                  <ToastContainer theme="dark" />

                  <div id="root">
                    <Header />
                    <Grid2 container flex={1} width="100%" height="100%">
                      {children}
                    </Grid2>
                    <Footer />
                  </div>
                </GoogleOAuthProvider>
              </ThemeProvider>
            </CookiesProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout

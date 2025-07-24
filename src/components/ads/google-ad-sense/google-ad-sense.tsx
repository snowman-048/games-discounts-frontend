'use client'

import Script from 'next/script'

import { isAdEnabled } from '@/helpers/isAdEnabled'

const GoogleAdSense = () => {
  if (!isAdEnabled()) return null

  return (
    <Script
      id="adsbygoogle-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_SENSE_ACCOUNT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('✅ AdSense script loaded')
      }}
    />
  )
}

export { GoogleAdSense }

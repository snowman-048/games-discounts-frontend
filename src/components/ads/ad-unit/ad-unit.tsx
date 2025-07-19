'use client'

import { CSSProperties, useEffect, useState } from 'react'

type TProps = Record<string, any> & {
  adSlot: string
  adFormat: string
  frameStyle?: CSSProperties
}

const MAX_RETRIES = 10

const AdUnit = ({ frameStyle, adSlot, adFormat, ...rest }: TProps) => {
  const [adScriptLoaded, setAdScriptLoaded] = useState(false)

  const isProd = process.env.NODE_ENV === 'production'

  const tryLoadGoogleAds = (retries = 0) => {
    if (!isProd) return

    if (typeof window !== 'undefined' && 'adsbygoogle' in window) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        console.log('✅ Google Ad rendered', retries)
        setAdScriptLoaded(true)
      } catch (e) {
        console.warn('AdSense push error:', e)
      }
    } else {
      retries++
      if (retries < MAX_RETRIES) {
        setTimeout(() => tryLoadGoogleAds(retries), 400)
      } else {
        console.warn(`❌ AdSense is still not available after ${retries + 1} retries`)
      }
    }
  }

  useEffect(() => {
    tryLoadGoogleAds()
  }, [])

  if (!isProd || !adScriptLoaded) return null

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center',
        ...frameStyle,
      }}
      data-ad-client={process.env.NEXT_PUBLIC_AD_SENSE_ACCOUNT}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      {...rest}
    />
  )
}

export { AdUnit }

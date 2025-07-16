'use client'

import { CSSProperties, useEffect, useRef } from 'react'

type TProps = Record<string, any> & {
  adSlot: string
  adFormat: string
  wrapperStyle?: CSSProperties
  frameStyle?: CSSProperties
  withWrapper?: boolean
}

const MAX_RETRIES = 10

const AdUnit = ({
  wrapperStyle,
  frameStyle,
  withWrapper = true,
  adSlot,
  adFormat,
  ...rest
}: TProps) => {
  const ref = useRef(null)

  const tryLoadGoogleAds = (retries = 0) => {
    if (!ref.current) return

    if (typeof window !== 'undefined' && 'adsbygoogle' in window) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        console.log('✅ Google Ad rendered')
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

  if (process.env.NODE_ENV !== 'production') return null

  const renderFrame = () => (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: 'block', ...frameStyle }}
      data-ad-client={process.env.NEXT_PUBLIC_AD_SENSE_ACCOUNT}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
      {...rest}
    />
  )

  if (withWrapper) return <div style={{ ...wrapperStyle }}>{renderFrame()}</div>

  return renderFrame()
}

export { AdUnit }

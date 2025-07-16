'use client'

import { CSSProperties, useEffect, useRef, useState } from 'react'

import { useObserveElementSize } from '@/hooks/useObserveElementSize'

type TProps = Record<string, any> & {
  adSlot: string
  adFormat: string
  wrapperStyle?: CSSProperties
  frameStyle?: CSSProperties
  observeWidth?: boolean
}

const MAX_RETRIES = 10

const AdUnit = ({
  wrapperStyle,
  frameStyle,
  adSlot,
  adFormat,
  observeWidth = false,
  ...rest
}: TProps) => {
  const [adWidth, setAdWidth] = useState<number | undefined>()

  const adRef = useRef(null)
  const wrapperRef = useRef(null)

  const { width } = useObserveElementSize(wrapperRef)

  const tryLoadGoogleAds = (retries = 0) => {
    if (!adRef.current) return

    if (typeof window !== 'undefined' && 'adsbygoogle' in window) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        console.log('✅ Google Ad rendered', retries)
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

  useEffect(() => {
    if (!observeWidth || !width) {
      return
    }
    setAdWidth(width * 0.9)
  }, [width, observeWidth])

  if (process.env.NODE_ENV !== 'production' || (observeWidth && !adWidth)) return null

  return (
    <div style={{ ...wrapperStyle }} ref={wrapperRef}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: adWidth, ...frameStyle }}
        data-ad-client={process.env.NEXT_PUBLIC_AD_SENSE_ACCOUNT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        {...rest}
      />
    </div>
  )
}

export { AdUnit }

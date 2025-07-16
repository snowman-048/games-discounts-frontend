import { CSSProperties, useEffect, useRef } from 'react'

type TProps = Record<string, any> & {
  adSlot: string
  adFormat: string
  wrapperStyle?: CSSProperties
  frameStyle?: CSSProperties
  withWrapper?: boolean
}

const AdUnit = ({
  wrapperStyle,
  frameStyle,
  withWrapper = true,
  adSlot,
  adFormat,
  ...rest
}: TProps) => {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return

    try {
      if ('adsbygoogle' in window) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } else {
        console.error('Adsense condition error:', 'adsbygoogle' in window)
      }
    } catch (e) {
      console.warn('AdSense error:', e)
    }
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

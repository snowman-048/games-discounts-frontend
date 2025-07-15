import { CSSProperties, useEffect, useRef } from 'react'

type TProps = Record<string, any> & {
  adSlot: string
  adFormat: string
  containerStyle?: CSSProperties
  frameStyle?: CSSProperties
}

const AdUnit = ({ containerStyle, frameStyle, adSlot, adFormat, ...rest }: TProps) => {
  const ref = useRef(null)

  useEffect(() => {
    if (window.adsbygoogle && ref.current) {
      try {
        window.adsbygoogle.push({})
      } catch (e) {
        // Ignore duplicate ad errors
      }
    }
  }, [])

  if (process.env.NODE_ENV !== 'production') return null

  return (
    <div style={{ ...containerStyle }}>
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
    </div>
  )
}

export { AdUnit }

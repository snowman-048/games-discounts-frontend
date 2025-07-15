import { CSSProperties, useEffect, useRef } from 'react'

type TProps = Record<string, any> & {
  adSlot: string
  adFormat: string
  containerStyle?: CSSProperties
  frameStyle?: CSSProperties
  withWrapper?: boolean
}

const AdUnit = ({
  containerStyle,
  frameStyle,
  withWrapper = true,
  adSlot,
  adFormat,
  ...rest
}: TProps) => {
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

  if (withWrapper) return <div style={{ ...containerStyle }}>{renderFrame()}</div>

  return renderFrame()
}

export { AdUnit }

'use client'

import { AdUnit } from '../ad-unit'

type TProps = {
  small?: boolean
}

const ResponsiveAd = ({ small }: TProps) => {
  return (
    <AdUnit
      adFormat="auto"
      adSlot="4334030439"
      data-full-width-responsive="true"
      wrapperStyle={{
        maxHeight: small ? '140px' : '280px',
      }}
    />
  )
}

export { ResponsiveAd }

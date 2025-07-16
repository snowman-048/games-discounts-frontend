'use client'

import { AdUnit } from '../ad-unit'

type TProps = {
  small?: boolean
}

const MultiplexGridAd = ({ small }: TProps) => {
  return (
    <AdUnit
      adFormat="autorelaxed"
      adSlot="6703191485"
      wrapperStyle={{
        maxHeight: small ? '100px' : '200px',
      }}
    />
  )
}

export { MultiplexGridAd }

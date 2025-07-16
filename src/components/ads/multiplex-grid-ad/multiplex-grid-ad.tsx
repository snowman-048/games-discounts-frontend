'use client'

import { AdUnit } from '../ad-unit'

const MultiplexGridAd = () => {
  return (
    <AdUnit
      adFormat="autorelaxed"
      adSlot="6703191485"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
      frameStyle={{
        width: '100%',
        height: '300px',
      }}
    />
  )
}

export { MultiplexGridAd }

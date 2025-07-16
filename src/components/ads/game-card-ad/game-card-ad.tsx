'use client'

import { Grid2 } from '@mui/material'

import { GlassCard } from '@/components/ui/cards/glass-card'

import { AdUnit } from '../ad-unit'

const GameCardAd = () => {
  return (
    <GlassCard>
      <Grid2 container sx={{ background: 'var(--color-l1)' }} width="100%" height="100%">
        <AdUnit
          adFormat="fluid"
          adSlot="4376411042"
          data-ad-layout-key="+29+rl+2w-11-86"
          wrapperStyle={{ width: '100%', height: '100%' }}
        />
      </Grid2>
    </GlassCard>
  )
}

export { GameCardAd }

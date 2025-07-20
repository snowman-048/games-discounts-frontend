'use client'

import { Grid2, useMediaQuery } from '@mui/material'

import { GlassCard } from '@/components/ui/cards/glass-card'

import { AdUnit } from '../ad-unit'

type TProps = {
  withMobileVariant?: boolean
}

const GameCardAd = ({ withMobileVariant = true }: TProps) => {
  const isMobileVariant = useMediaQuery(`(max-width: 600px)`)

  return (
    <GlassCard
      sx={{ minWidth: '252px', maxHeight: withMobileVariant && isMobileVariant ? '215px' : 'auto' }}
    >
      <Grid2
        container
        sx={{
          background: 'var(--color-l1)',
          '> *': {
            height: '100%',
            width: '100%',
          },
        }}
        width="100%"
        height="100%"
      >
        <AdUnit adFormat="fluid" adSlot="4376411042" data-ad-layout-key="+29+rl+2w-11-86" />
      </Grid2>
    </GlassCard>
  )
}

export { GameCardAd }

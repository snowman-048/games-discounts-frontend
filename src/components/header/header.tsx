'use client'

import { useEffect, useState } from 'react'

import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Backdrop, Grid2, IconButton, Popover } from '@mui/material'

import { getRegions } from '@/api/regions'
import { TRegionWithStores } from '@/types/region.types'

import { Logo } from '../logo'
import { RegionSettings } from '../region-settings/region-settings'
import { GlassCard } from '../ui/cards/glass-card'
import { Container } from '../ui/container'

const Header = () => {
  const [locationAnchorEl, setLocationAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [regions, setRegions] = useState<TRegionWithStores[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getRegions()
        setRegions(data)
      } catch (err) {
        console.log('Error getting regions', (err as any).message)
      }
    })()
  }, [])

  return (
    <>
      <Grid2
        container
        width="100%"
        marginBottom={3}
        position="fixed"
        sx={{ top: 0, left: 0, right: 0, zIndex: 5, height: 64 }}
      >
        <GlassCard
          style={{
            width: '100%',
            height: '100%',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            marginTop: -1,
          }}
        >
          <Container flexDirection="row" alignItems="center" justifyContent="space-between">
            <Logo />

            <div>
              <IconButton onClick={(e) => setLocationAnchorEl(e.currentTarget)}>
                <LocationOnIcon />
              </IconButton>
            </div>
          </Container>
        </GlassCard>
      </Grid2>

      <Backdrop
        sx={{ zIndex: 6, background: 'rgba(0, 0, 0, 0.7)' }}
        open={!!locationAnchorEl}
        transitionDuration={100}
      >
        <Popover
          id="location-settings"
          open={!!locationAnchorEl}
          anchorEl={locationAnchorEl}
          onClose={() => setLocationAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transitionDuration={100}
          slotProps={{
            paper: { sx: { background: 'transparent', boxShadow: 'none', borderRadius: '20px' } },
          }}
        >
          <RegionSettings regions={regions} />
        </Popover>
      </Backdrop>
    </>
  )
}

export { Header }

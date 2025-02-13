'use client'

import { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MenuIcon from '@mui/icons-material/Menu'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import WindowIcon from '@mui/icons-material/Window'
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Drawer,
  Grid2,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { getRegions } from '@/api/regions'
import { OUR_EMAIL } from '@/configs/contacts.config'
import { EAppRoute } from '@/enums/app-route.enum'
import { TRegionWithStores } from '@/types/region.types'

import { Logo } from '../logo'
import { RegionSettings } from '../region-settings/region-settings'
import { GlassCard } from '../ui/cards/glass-card'
import { Container } from '../ui/container'

const links = [
  { label: 'Home', path: `/${EAppRoute.HOME}`, icon: WindowIcon },
  {
    label: 'Active Discounts',
    path: `/${EAppRoute.ACTIVE_DISCOUNTS}/1`,
    icon: WhatshotIcon,
    customIsActive: (pathname: string) => pathname.includes(EAppRoute.ACTIVE_DISCOUNTS),
  },
]

const Header = () => {
  const [locationAnchorEl, setLocationAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [regions, setRegions] = useState<TRegionWithStores[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const pathname = usePathname()

  const isLinkActive = (path: string) => pathname === path

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

  const renderNavigation = (inDrawer = false) => {
    return (
      <Grid2
        container
        flexDirection={inDrawer ? 'column' : 'row'}
        alignItems={inDrawer ? 'flex-start' : 'center'}
        justifyContent={inDrawer ? 'space-between' : 'flex-start'}
        gap={3}
        height="100%"
      >
        <Grid2 container flexDirection={inDrawer ? 'column' : 'row'} gap={3}>
          {links.map((link) => (
            <Link href={link.path} key={link.label} onClick={() => setIsDrawerOpen(false)}>
              <Typography
                fontWeight="bold"
                color={
                  (link.customIsActive ? link.customIsActive(pathname) : isLinkActive(link.path))
                    ? 'var(--accent)'
                    : 'var(--text-primary)'
                }
                alignItems="center"
                display="flex"
                gap={0.5}
              >
                {link.icon && <link.icon />}
                {link.label}
              </Typography>
            </Link>
          ))}
        </Grid2>
        <Button
          onClick={(e) => setLocationAnchorEl(e.currentTarget)}
          sx={{
            color: 'var(--text-primary)',
            gap: 1,
            textTransform: 'none',
            width: inDrawer ? '100%' : 'fit-content',
          }}
          variant="outlined"
        >
          Region Settings
          <LocationOnIcon />
        </Button>
      </Grid2>
    )
  }

  return (
    <>
      <Grid2
        container
        width="100vw"
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
            justifyContent: 'center',
          }}
        >
          <Container flexDirection="row" justifyContent="space-between">
            <Logo />

            <div>
              <Grid2 sx={{ display: { xs: 'none', md: 'block' } }}>{renderNavigation()}</Grid2>
              <IconButton
                onClick={() => setIsDrawerOpen(true)}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Container>
        </GlassCard>
      </Grid2>

      <Drawer
        anchor={'right'}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            background: 'transparent',
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              background: 'var(--backdrop)',
            },
          },
        }}
      >
        <Box flex={1} height="100%" width="300px" sx={{ background: 'transparent' }}>
          <GlassCard
            style={{
              width: '100%',
              height: '100%',
              borderRight: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Stack width="100%" height="100%">
              <Grid2 container justifyContent="flex-end" width="100%" py="11px" px={2}>
                <IconButton
                  onClick={() => setIsDrawerOpen(false)}
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid2>
              <Divider sx={{ marginTop: '-1px' }} />
              <Grid2 padding={3} flex={1}>
                {renderNavigation(true)}
              </Grid2>
              <Stack padding={3} paddingTop={0} width="100%">
                <Typography color="var(--text-secondary)" textAlign="center" variant="body2">
                  Contact us
                </Typography>
                <address>
                  <a href={`mailto:${OUR_EMAIL}`}>
                    <Typography textAlign="center">{OUR_EMAIL}</Typography>
                  </a>
                </address>
              </Stack>
            </Stack>
          </GlassCard>
        </Box>
      </Drawer>

      <Backdrop
        sx={{ zIndex: 6, background: 'var(--backdrop)', width: '100vw' }}
        open={!!locationAnchorEl}
        transitionDuration={100}
      >
        <Popover
          id="location-settings"
          open={!!locationAnchorEl}
          anchorEl={locationAnchorEl}
          onClose={() => setLocationAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
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

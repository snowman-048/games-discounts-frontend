'use client'

import { useMemo, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import WindowIcon from '@mui/icons-material/Window'
import { Box, Divider, Drawer, Grid2, IconButton, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { Logo } from '@/components/logo'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'
import { TypographyV2 } from '@/components/ui/typography'
import { OUR_EMAIL } from '@/configs/contacts.config'
import { EAppRoute } from '@/enums/app-route.enum'
import { TGameSearchParams } from '@/types/game-search.types'

import { ExploreButton } from './libs/components/explore-button'
import { GamesSearch } from './libs/components/games-search'
import { NavButton } from './libs/components/nav-button'
import { ProfileButton } from './libs/components/profile-button'
import { RegionsButton } from './libs/components/regions-button'

type TProps = {
  query: TGameSearchParams
}

const HeaderComponent = ({ query }: TProps) => {
  const t = useTranslations('Header')

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const pathname = usePathname()

  const isLinkActive = (path: string) => pathname === path

  const links = useMemo(
    () => [
      { label: t('home'), path: `/${EAppRoute.HOME}`, icon: WindowIcon },
      {
        label: t('active_discounts'),
        path: `/${EAppRoute.ACTIVE_DISCOUNTS}/1`,
        icon: WhatshotIcon,
        customIsActive: (pathname: string) => pathname.includes(EAppRoute.ACTIVE_DISCOUNTS),
      },
    ],
    [t],
  )

  const renderNavigation = (inDrawer = false) => {
    return (
      <Grid2
        container
        flexDirection={inDrawer ? 'column' : 'row'}
        alignItems={inDrawer ? 'flex-start' : 'center'}
        justifyContent={inDrawer ? 'space-between' : 'flex-start'}
        gap={3}
        height="100%"
        flexWrap="nowrap"
      >
        <Grid2
          container
          flexDirection={inDrawer ? 'column' : 'row'}
          flexWrap="nowrap"
          alignItems={inDrawer ? 'flex-start' : 'center'}
          gap={3}
          width="100%"
        >
          <GamesSearch query={query} closeDrawer={() => setIsDrawerOpen(false)} />
          {links.map((link) => (
            <NavButton
              key={link.label}
              link={link.path}
              label={link.label}
              icon={link.icon}
              isActive={
                link.customIsActive ? link.customIsActive(pathname) : isLinkActive(link.path)
              }
              onClick={() => setIsDrawerOpen(false)}
            />
          ))}
          <ExploreButton onNavigate={() => setIsDrawerOpen(false)} renderAsList={inDrawer} />
        </Grid2>
        <RegionsButton inDrawer={inDrawer} />
        {!inDrawer && <ProfileButton />}
      </Grid2>
    )
  }

  return (
    <>
      <Grid2 container width="100%" height="100%" marginBottom={3}>
        <GlassCard
          style={{
            width: '100%',
            height: '100%',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            marginTop: -1,
            justifyContent: 'center',
            overflow: 'visible',
          }}
        >
          <Container flexDirection="row" justifyContent="space-between" gap={5}>
            <Logo />

            <Grid2 container flex={1} justifyContent="flex-end" gap={2}>
              <Grid2 sx={{ display: { xs: 'none', md: 'block' } }} flex={1} flexWrap="nowrap">
                {renderNavigation()}
              </Grid2>
              <ProfileButton sx={{ display: { xs: 'flex', md: 'none' } }} />
              <IconButton
                onClick={() => setIsDrawerOpen(true)}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Grid2>
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
        <Box
          flex={1}
          height="100%"
          width={{ xs: '100vw', sm: '550px' }}
          sx={{ background: 'transparent' }}
        >
          <GlassCard
            sx={{
              width: '100%',
              height: '100%',
              borderRight: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: { xs: 0, sm: '20px' },
              borderBottomLeftRadius: { xs: 0, sm: '20px' },
              borderLeftWidth: { xs: 0, sm: '1px' },
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
                <TypographyV2 color="inactive" textAlign="center" variant="body2">
                  {t('contact_us')}
                </TypographyV2>
                <address>
                  <a href={`mailto:${OUR_EMAIL}`}>
                    <TypographyV2 textAlign="center">{OUR_EMAIL}</TypographyV2>
                  </a>
                </address>
              </Stack>
            </Stack>
          </GlassCard>
        </Box>
      </Drawer>
    </>
  )
}

export { HeaderComponent }

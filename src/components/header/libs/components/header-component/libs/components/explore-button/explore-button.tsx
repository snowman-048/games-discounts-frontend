'use client'

import { useMemo, useState } from 'react'

import ExploreIcon from '@mui/icons-material/Explore'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import { Stack } from '@mui/material'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { Popover } from '@/components/ui/popover'
import { EAppRoute } from '@/enums/app-route.enum'

import { NavButton } from '../nav-button'

type TProps = {
  onNavigate?: () => void
}

const ExploreButton = ({ onNavigate }: TProps) => {
  const t = useTranslations('Header')

  const [buttonAnchorEl, setButtonAnchorEl] = useState<HTMLButtonElement | null>(null)

  const pathname = usePathname()

  const links = useMemo(
    () => [
      {
        label: t('hottest_deals'),
        path: `/${EAppRoute.HOTTEST_DEALS}/1`,
        icon: TrendingDownIcon,
        customIsActive: (pathname: string) => pathname.includes(EAppRoute.HOTTEST_DEALS),
      },
      {
        label: t('newest_releases'),
        path: `/${EAppRoute.NEWEST_RELEASES}/1`,
        icon: FiberNewIcon,
        customIsActive: (pathname: string) => pathname.includes(EAppRoute.NEWEST_RELEASES),
      },
      {
        label: t('all_games'),
        path: `/${EAppRoute.ALL_GAMES}/1`,
        icon: SportsEsportsIcon,
        customIsActive: (pathname: string) => pathname.includes(EAppRoute.ALL_GAMES),
      },
      {
        label: t('articles'),
        path: `/${EAppRoute.ARTICLES}/1`,
        icon: NewspaperIcon,
        customIsActive: (pathname: string) => pathname.includes(EAppRoute.ARTICLES),
      },
    ],
    [t],
  )

  return (
    <>
      <NavButton
        label={t('explore')}
        icon={ExploreIcon}
        onClick={(e) => {
          setButtonAnchorEl(e.currentTarget as any)
        }}
        isActive={[EAppRoute.ALL_GAMES, EAppRoute.HOTTEST_DEALS, EAppRoute.NEWEST_RELEASES].some(
          (path) => pathname.includes(path),
        )}
      />

      <Popover
        anchorEl={buttonAnchorEl}
        onClose={() => setButtonAnchorEl(null)}
        fitContent
        cardProps={{
          sx: {
            marginTop: 2,
          },
        }}
      >
        <Stack gap={3}>
          {links.map((link) => (
            <NavButton
              key={link.label}
              link={link.path}
              label={link.label}
              icon={link.icon}
              isActive={link.customIsActive(pathname)}
              onClick={() => {
                setButtonAnchorEl(null)
                onNavigate?.()
              }}
            />
          ))}
        </Stack>
      </Popover>
    </>
  )
}

export { ExploreButton }

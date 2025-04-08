'use client'

import { useMemo, useState } from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import { Box, BoxProps, FormGroup, Grid2, IconButton, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'
import { useAppStore } from '@/store/app.store'
import { useUserStore } from '@/store/user.store'
import { TGame } from '@/types/game.types'

import { AuthModal } from '../auth-modal'
import { CreateNewWishlistButton } from '../create-new-wishlist-button'
import { NoDataLabel } from '../no-data-label'
import { Popover } from '../ui/popover'
import { Tooltip } from '../ui/tooltip'
import { TypographyV2 } from '../ui/typography'
import { WishlistManagementItem } from './libs/components/wishlist-management-item'

type TProps = BoxProps & {
  game: TGame
}

const AddToWishlistButton = ({ game, ...rest }: TProps) => {
  const t = useTranslations('AddToWishlistButton')

  const stores = useAppStore((state) => state.stores)
  const user = useUserStore((state) => state.user)

  const [buttonAnchorEl, setButtonAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const isIncludedInAnyWishlist = useMemo(
    () =>
      user?.wishlists.some((wishlist) =>
        wishlist.wishlistedGames.some((item) => item.gameId === game.id),
      ),
    [user, game],
  )

  if (!stores) {
    return <></>
  }

  return (
    <>
      <Box {...rest}>
        <Tooltip
          title={isIncludedInAnyWishlist ? t('already_in_wishlist') : t('add_to_wishlist')}
          delay={500}
        >
          <IconButton
            sx={{
              color: isIncludedInAnyWishlist ? 'var(--color-green)' : 'var(--color-primary)',
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (!user) {
                setIsLoginModalOpen(true)
                return
              }
              setButtonAnchorEl(e.currentTarget)
            }}
          >
            {isIncludedInAnyWishlist ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Popover anchorEl={buttonAnchorEl} onClose={() => setButtonAnchorEl(null)}>
        <Stack alignItems="center" width="100%" gap={3}>
          <TypographyV2 fontWeight="bold" fontSize="text-l">
            {t('add_to_wishlist_title')}
          </TypographyV2>

          <TypographyV2
            sx={{ fontStyle: 'italic' }}
            textAlign="center"
            fontSize="text-l"
            marginTop={-1}
          >
            {game.title}
          </TypographyV2>

          <FormGroup sx={{ width: '100%' }}>
            {!!user?.wishlists.length && (
              <Stack gap={2} width="100%">
                {user.wishlists.map((wishlist) => (
                  <WishlistManagementItem key={wishlist.id} wishlist={wishlist} game={game} />
                ))}
              </Stack>
            )}
            {!user?.wishlists.length && <NoDataLabel label={t('no_wishlists')} />}
          </FormGroup>

          <Grid2 container alignItems="center" justifyContent="space-between" width="100%">
            <CreateNewWishlistButton />
            <Link href={`/${EAppRoute.WISHLISTS}`}>
              <Grid2 container alignItems="center" gap={1} sx={{ color: 'var(--color-brand)' }}>
                <TypographyV2 color="brand">{t('manage_wishlists')}</TypographyV2>
                <ArrowForwardIosIcon sx={{ width: 15, height: 15 }} />
              </Grid2>
            </Link>
          </Grid2>
        </Stack>
      </Popover>

      <AuthModal open={isLoginModalOpen} handleClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}

export { AddToWishlistButton }

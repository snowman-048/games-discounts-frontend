'use client'

import { useMemo, useState } from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import { Box, BoxProps, FormGroup, Grid2, IconButton, Stack } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'
import { useUserStore } from '@/store/user.store'
import { TGame } from '@/types/game.types'
import { CustomToast } from '@/utils/custom-toast'

import { CreateNewWishlistButton } from '../create-new-wishlist-button'
import { Popover } from '../ui/popover'
import { TypographyV2 } from '../ui/typography'
import { WishlistManagementItem } from './libs/components/wishlist-management-item'

type TProps = BoxProps & {
  game: TGame
}

const AddToWishlistButton = ({ game, ...rest }: TProps) => {
  const user = useUserStore((state) => state.user)

  const [buttonAnchorEl, setButtonAnchorEl] = useState<HTMLButtonElement | null>(null)

  const isIncludedInAnyWishlist = useMemo(
    () =>
      user?.wishlists.some((wishlist) =>
        wishlist.wishlistedGames.some((item) => item.gameId === game.id),
      ),
    [user, game],
  )

  return (
    <>
      <Box {...rest}>
        <IconButton
          sx={{
            color: isIncludedInAnyWishlist ? 'var(--color-green)' : 'var(--color-primary)',
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (!user) {
              // TODO: Suggest to login
              CustomToast('info', 'You need to be logged in to add game to wishlist')
              return
            }
            setButtonAnchorEl(e.currentTarget)
          }}
        >
          {isIncludedInAnyWishlist ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
        </IconButton>
      </Box>

      <Popover anchorEl={buttonAnchorEl} onClose={() => setButtonAnchorEl(null)}>
        <Stack alignItems="center" width="100%" gap={3}>
          <TypographyV2 fontWeight="bold" fontSize="text-l">
            Add game to wishlist
          </TypographyV2>

          <TypographyV2 sx={{ fontStyle: 'italic' }} textAlign="center">
            {game.title}
          </TypographyV2>

          <FormGroup sx={{ width: '100%' }}>
            <Stack gap={1} width="100%">
              {user?.wishlists.map((wishlist) => (
                <WishlistManagementItem key={wishlist.id} wishlist={wishlist} game={game} />
              ))}
            </Stack>
          </FormGroup>

          <Grid2 container alignItems="center" justifyContent="space-between" width="100%">
            <CreateNewWishlistButton />
            <Link href={`/${EAppRoute.WISHLISTS}`}>
              <Grid2 container alignItems="center" gap={1} sx={{ color: 'var(--color-brand)' }}>
                <TypographyV2 color="brand">Manage Wishlists</TypographyV2>
                <ArrowForwardIosIcon sx={{ width: 15, height: 15 }} />
              </Grid2>
            </Link>
          </Grid2>
        </Stack>
      </Popover>
    </>
  )
}

export { AddToWishlistButton }

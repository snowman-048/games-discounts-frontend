'use client'

import { useState } from 'react'

import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import { Box, BoxProps, Button, Grid2, IconButton, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'

import { removeGameFromWishlist } from '@/api/wishlist'
import { useUserStore } from '@/store/user.store'
import { TGame } from '@/types/game.types'
import { CustomToast } from '@/utils/custom-toast'

import { Popover } from '../ui/popover'
import { Tooltip } from '../ui/tooltip'
import { TypographyV2 } from '../ui/typography'

type TProps = BoxProps & {
  game: TGame
  wishlistId: number
  onRemoveGame?: (gameId: number) => void
}

const RemoveFromWishlistButton = ({ game, wishlistId, onRemoveGame, ...rest }: TProps) => {
  const t = useTranslations()

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const [buttonAnchorEl, setButtonAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const removeGame = async () => {
    try {
      setIsLoading(true)
      const { data } = await removeGameFromWishlist({ gameId: game.id, wishlistId })

      onRemoveGame?.(game.id)
      setUser({ ...user, wishlists: data } as any)
      CustomToast('success', 'Game removed from wishlist')
    } catch (err) {
      CustomToast('error', (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box {...rest}>
        <Tooltip title="Remove the game from the wishlist" delay={500}>
          <IconButton
            sx={{
              color: 'var(--color-red)',
            }}
            onClick={(e) => {
              e.stopPropagation()
              setButtonAnchorEl(e.currentTarget)
            }}
          >
            <BookmarkRemoveIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Popover
        anchorEl={buttonAnchorEl}
        onClose={() => setButtonAnchorEl(null)}
        maxWidth={250}
        withBackdrop={false}
        fixedWidth
      >
        <Stack gap={1.5}>
          <TypographyV2>{t('RemoveFromWishlistButton.delete_warning')}</TypographyV2>

          <Grid2 container alignItems="center" justifyContent="flex-end" gap={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setButtonAnchorEl(null)}
              disabled={isLoading}
            >
              {t('no')}
            </Button>
            <Button variant="outlined" size="small" loading={isLoading} onClick={removeGame}>
              {t('yes')}
            </Button>
          </Grid2>
        </Stack>
      </Popover>
    </>
  )
}

export { RemoveFromWishlistButton }

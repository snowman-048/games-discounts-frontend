'use client'

import { useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Button } from '@mui/material'
import { useTranslations } from 'next-intl'

import { MAX_WISHLISTS } from '@/configs/wishlists.config'
import { useUserStore } from '@/store/user.store'

import { CreateWishlistModal } from '../create-wishlist-modal'
import { Tooltip } from '../ui/tooltip'
import { TypographyV2 } from '../ui/typography'

const CreateNewWishlistButton = () => {
  const t = useTranslations('CreateNewWishlistButton')

  const user = useUserStore((state) => state.user)

  const [isCreateWishlistOpen, setIsCreateWishlistOpen] = useState(false)

  const isWishlistsLimit = (user?.wishlists?.length || 0) >= MAX_WISHLISTS

  return (
    <>
      <Tooltip title={isWishlistsLimit ? 'You have reached the wishlists limit' : ''}>
        <Box
          width="fit-content"
          sx={{
            alignSelf: 'flex-start',
          }}
        >
          <Button
            sx={{
              gap: 1,
            }}
            onClick={() => setIsCreateWishlistOpen(true)}
            disabled={isWishlistsLimit}
          >
            <AddCircleOutlineIcon />
            <TypographyV2
              fontSize="text-l"
              color={isWishlistsLimit ? 'disabled' : 'brand'}
              fontWeight="bold"
            >
              {t('create_new')}
            </TypographyV2>
          </Button>
        </Box>
      </Tooltip>

      <CreateWishlistModal
        open={isCreateWishlistOpen}
        handleClose={() => setIsCreateWishlistOpen(false)}
      />
    </>
  )
}

export { CreateNewWishlistButton }

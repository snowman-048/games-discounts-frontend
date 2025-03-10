'use client'

import { useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Button } from '@mui/material'

import { MAX_WISHLISTS } from '@/configs/wishlists.config'
import { useUserStore } from '@/store/user.store'

import { CreateWishlistModal } from '../create-wishlist-modal'
import { TypographyV2 } from '../ui/typography'

const CreateNewWishlistButton = () => {
  const user = useUserStore((state) => state.user)

  const [isCreateWishlistOpen, setIsCreateWishlistOpen] = useState(false)

  const isWishlistsLimit = (user?.wishlists?.length || 0) >= MAX_WISHLISTS

  return (
    <>
      <Button
        sx={{
          gap: 1,
          alignSelf: 'flex-start',
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
          Create new
        </TypographyV2>
      </Button>

      <CreateWishlistModal
        open={isCreateWishlistOpen}
        handleClose={() => setIsCreateWishlistOpen(false)}
      />
    </>
  )
}

export { CreateNewWishlistButton }

import { useMemo, useState } from 'react'

import { Checkbox, FormControlLabel } from '@mui/material'

import { addGameToWishlist, removeGameFromWishlist } from '@/api/wishlist'
import { WishlistLinkItem } from '@/components/wishlist-link-item'
import { useUserStore } from '@/store/user.store'
import { TGame } from '@/types/game.types'
import { TUserWishlist } from '@/types/wishlist.types'
import { CustomToast } from '@/utils/custom-toast'

type TProps = {
  wishlist: TUserWishlist
  game: TGame
}

const WishlistManagementItem = ({ game, wishlist }: TProps) => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const [isLoading, setIsLoading] = useState(false)

  const isSelected = useMemo(
    () => wishlist.wishlistedGames.some((item) => item.gameId === game.id),
    [wishlist, game],
  )

  const toggleWishlist = async () => {
    if (isLoading) {
      return
    }
    try {
      setIsLoading(true)
      const { data } = await (isSelected ? removeGameFromWishlist : addGameToWishlist)({
        gameId: game.id,
        wishlistId: wishlist.id,
        storeIds: game.priceHistory.reduce((acc, item) => {
          if (!acc.includes(item.storeId)) {
            acc.push(item.storeId)
          }
          return acc
        }, [] as number[]),
      })

      setUser({ ...user, wishlists: data } as any)

      CustomToast(
        'success',
        isSelected
          ? `Game removed from wishlist "${wishlist?.name}"`
          : `Game added to wishlist "${wishlist?.name}"`,
      )
    } catch (err) {
      CustomToast('error', (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <FormControlLabel
        key={wishlist.id}
        sx={{
          width: '100%',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          overflow: 'hidden',
          ' > div': { width: '100%', maxWidth: '100%', overflow: 'hidden' },
        }}
        control={<Checkbox />}
        checked={isSelected}
        slotProps={{
          typography: {
            component: 'div',
          },
        }}
        disabled={isLoading}
        onChange={toggleWishlist}
        label={
          <WishlistLinkItem
            wishlist={wishlist}
            withLink={false}
            isSmall
            onClick={toggleWishlist}
            disabled={isLoading}
          />
        }
      />
    </>
  )
}

export { WishlistManagementItem }

import { useMemo, useState } from 'react'

import { Checkbox, FormControlLabel, Grid2, Stack } from '@mui/material'

import { toggleGameInWishlist } from '@/api/wishlist'
import { StoreIcon } from '@/components/store-icon'
import { WishlistLinkItem } from '@/components/wishlist-link-item'
import { useAppStore } from '@/store/app.store'
import { useUserStore } from '@/store/user.store'
import { TGame } from '@/types/game.types'
import { TUserWishlist } from '@/types/wishlist.types'
import { CustomToast } from '@/utils/custom-toast'

type TProps = {
  wishlist: TUserWishlist
  game: TGame
}

const WishlistManagementItem = ({ game, wishlist }: TProps) => {
  const stores = useAppStore((state) => state.stores)
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const [isLoading, setIsLoading] = useState(false)

  const wishlistedGame = useMemo(
    () => wishlist.wishlistedGames.find((item) => item.gameId === game.id),
    [wishlist, game, stores],
  )

  const availableStoreIds = useMemo(
    () =>
      game.priceHistory.reduce((acc, item) => {
        if (!acc.includes(item.storeId)) {
          acc.push(item.storeId)
        }
        return acc
      }, [] as number[]),
    [game],
  )

  const toggleWishlistedGameStore = async (storeIds: number[]) => {
    if (isLoading) {
      return
    }
    try {
      setIsLoading(true)

      const { data } = await toggleGameInWishlist({
        gameId: game.id,
        wishlistId: wishlist.id,
        storeIds,
      })

      setUser({ ...user, wishlists: data } as any)
    } catch (err) {
      CustomToast('error', (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Stack gap={1}>
      <WishlistLinkItem
        wishlist={wishlist}
        withLink={false}
        isSmall
        onClick={() => toggleWishlistedGameStore(availableStoreIds)}
        disabled={isLoading}
      />
      <Grid2 container width="100%" gap={1} alignItems="center">
        {availableStoreIds.map((storeId) => {
          const store = stores.find((store) => store.id === storeId)?.name
          if (!store) {
            return <></>
          }
          const value = !!wishlistedGame?.wishlistedGameStores.some(
            (item) => item.storeId === storeId,
          )
          return (
            <FormControlLabel
              key={storeId}
              sx={{
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
              name={store}
              control={<Checkbox />}
              value={value}
              checked={value}
              slotProps={{
                typography: {
                  component: 'div',
                },
              }}
              disabled={isLoading}
              onChange={(e) => {
                const value = (e.target as any).checked
                const currentStoreIds =
                  wishlistedGame?.wishlistedGameStores?.map((item) => item.storeId) || []

                if (!value) {
                  toggleWishlistedGameStore(currentStoreIds.filter((id) => id !== storeId))
                } else if (value && !currentStoreIds.includes(storeId)) {
                  toggleWishlistedGameStore([...currentStoreIds, storeId])
                }
              }}
              label={<StoreIcon store={store} withLabel={false} />}
            />
          )
        })}
      </Grid2>
    </Stack>
  )
}

export { WishlistManagementItem }

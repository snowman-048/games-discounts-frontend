import { GameCard } from '@/components/game-card'
import { GameCardsList } from '@/components/game-cards-list'
import { NoDataLabel } from '@/components/no-data-label'
import { TWishlistWithGames } from '@/types/wishlist.types'

type TProps = {
  wishlist: TWishlistWithGames
  setWishlist: (payload: TWishlistWithGames) => void
}

const WishlistedItemsList = ({ wishlist, setWishlist }: TProps) => {
  if (!wishlist.wishlistedGames.length) {
    return <NoDataLabel />
  }

  return (
    <GameCardsList>
      {wishlist.wishlistedGames.map((item) => (
        <GameCard
          game={{
            ...item.game,
            // TODO: Move this logic to the backend
            priceHistory: item.game.priceHistory.filter((ph) =>
              item.wishlistedGameStores.some((preference) => preference.storeId === ph.storeId),
            ),
          }}
          key={item.gameId}
          switchToListOnMobile
          wishlistButtonType="remove"
          removeFromWishlistId={wishlist.id}
          onRemoveGameFromWishlist={(gameId) =>
            setWishlist({
              ...wishlist,
              wishlistedGames: wishlist.wishlistedGames.filter((item) => item.gameId !== gameId),
            })
          }
        />
      ))}
    </GameCardsList>
  )
}

export { WishlistedItemsList }

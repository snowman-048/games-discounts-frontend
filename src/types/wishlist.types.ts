import { TGame } from './game.types'

type TBaseWishlistData = {
  id: number
  name: string
  discountNotificationByEmail: boolean
}

type TUserWishlist = TBaseWishlistData & {
  wishlistedGames: { id: number; gameId: number; wishlistId: number }[]
}

type TWishlistWithGames = TBaseWishlistData & {
  wishlistedGames: {
    id: number
    gameId: number
    wishlistId: number
    game: TGame
    wishlistedGameStores: { id: number; storeId: number; wishlistedGameId: number }[]
  }[]
}

export type { TUserWishlist, TWishlistWithGames }

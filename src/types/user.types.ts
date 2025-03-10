import { TRegion } from './region.types'
import { TStore } from './store.types'

type TWishlist = {
  id: number
  name: string
  discountNotificationByEmail: boolean
  wishlistedGames: { id: number; gameId: number; wishlistId: number }[]
}

type TStoreRegionPreferences = {
  id: number
  accountId: number
  storeId: number
  regionId: number
  store: TStore
  region: TRegion
}

type TUser = {
  id: number
  email: string
  username: string
  wishlists: TWishlist[]
  storeRegionPreferences: TStoreRegionPreferences[]
}

export type { TUser, TWishlist }

import { TRegion } from './region.types'
import { TStore } from './store.types'
import { TUserWishlist } from './wishlist.types'

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
  wishlists: TUserWishlist[]
  storeRegionPreferences: TStoreRegionPreferences[]
}

export type { TUser }

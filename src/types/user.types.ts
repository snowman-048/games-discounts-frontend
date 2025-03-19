import { ERole } from '@/enums/roles.enum'

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
  role: ERole
  wishlists: TUserWishlist[]
  storeRegionPreferences: TStoreRegionPreferences[]
  createdAt: string
}

export type { TUser }

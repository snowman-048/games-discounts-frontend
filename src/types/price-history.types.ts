import { TRegion } from './region.types'
import { TStore } from './store.types'

type TPriceHistory = {
  id: number
  gameId: number
  storeId: number
  regionId: number
  discountEnds: string
  initialPrice: number
  discountStarts: string
  discountedPrice: number
  discountPercentage: number
  store: TStore
  region: TRegion
  meta?: any
}

export type { TPriceHistory }

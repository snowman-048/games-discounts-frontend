import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'

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
  isLowestPrice: boolean
  store: TStore
  region: TRegion
  meta?: {
    type?: EPriceHistoryMetaType
  }
}

export type { TPriceHistory }

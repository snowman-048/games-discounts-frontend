import { TPriceHistory } from '@/types/price-history.types'
import { TRegion } from '@/types/region.types'

type TPriceChartData = {
  date: number
  price: number
  historyItem: TPriceHistory
  region: TRegion
}

export type { TPriceChartData }

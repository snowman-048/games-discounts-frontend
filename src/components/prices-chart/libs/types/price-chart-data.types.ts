import { TRegion } from '@/types/region.types'

type TPriceChartData = {
  date: number
  region: TRegion
} & Record<string, any>

export type { TPriceChartData }

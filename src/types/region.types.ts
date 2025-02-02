import { TStore } from './store.types'

type TRegion = {
  id: number
  country: string
  currency: string
  currencySymbol: string
  key: string
}

type TRegionWithStores = TRegion & {
  regionStores: { regionId: number; storeId: number; store: TStore }[]
}

export type { TRegion, TRegionWithStores }

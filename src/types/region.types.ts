import { TStore } from './store.types'

type TLocalizedKey = {
  id: number
  localizedKey: string
  regionId: number
  storeId: number
}

type TRegion = {
  id: number
  country: string
  currency: string
  currencySymbol: string
  key: string
  localizedKeys?: TLocalizedKey[]
}

type TRegionWithStores = TRegion & {
  regionStores: { regionId: number; storeId: number; store: TStore }[]
}

export type { TRegion, TRegionWithStores }

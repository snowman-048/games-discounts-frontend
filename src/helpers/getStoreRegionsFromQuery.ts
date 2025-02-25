import { EStore } from '@/enums/store.enum'
import { TGameSearchParams } from '@/types/game-search.types'

import { getStoreRegionKey } from './getStoreRegionKey'

const storeRegionKeys = Object.values(EStore).map((item) => getStoreRegionKey(item))

const getStoreRegionsFromQuery = (query: TGameSearchParams) =>
  storeRegionKeys.reduce(
    (acc, item) => {
      if ((query as any)[item]) {
        acc[item] = (query as any)[item]
      }
      return acc
    },
    {} as Record<string, string>,
  )

export { getStoreRegionsFromQuery }

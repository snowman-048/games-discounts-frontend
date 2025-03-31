import { EStore } from '@/enums/store.enum'
import { getStoreRegionKey } from '@/helpers/getStoreRegionKey'

const defaultRegions = [
  { storeName: EStore.PSN, defaultRegion: 24, queryKey: getStoreRegionKey(EStore.PSN) },
  { storeName: EStore.NINTENDO, defaultRegion: 24, queryKey: getStoreRegionKey(EStore.NINTENDO) },
  { storeName: EStore.XBOX, defaultRegion: 24, queryKey: getStoreRegionKey(EStore.XBOX) },
]

export { defaultRegions }

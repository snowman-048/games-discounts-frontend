import { EStore } from '@/enums/store.enum'

const getStoreRegionKey = (store: EStore) => `${store.toLowerCase()}R`

export { getStoreRegionKey }

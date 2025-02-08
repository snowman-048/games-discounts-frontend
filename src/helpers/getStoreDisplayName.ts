import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'

const STORE_TO_STORE_NAME = {
  [EStore.PSN]: {
    full: 'PlayStation store',
    short: 'PlayStation',
  },
  [EPriceHistoryMetaType.PS_PLUS]: {
    full: 'PS+',
    short: 'PS+',
  },
  [EStore.NINTENDO]: {
    full: 'Nintendo eShop',
    short: 'Nintendo',
  },
  [EStore.XBOX]: {
    full: 'Xbox store',
    short: 'Xbox',
  },
}

const getStoreDisplayName = (store: EStore | EPriceHistoryMetaType) => STORE_TO_STORE_NAME[store]

export { getStoreDisplayName }

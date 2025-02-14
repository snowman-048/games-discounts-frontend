import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'

const STORE_TO_STORE_NAME = {
  [EStore.PSN]: {
    full: 'PlayStation Store',
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
    full: 'Xbox Store',
    short: 'Xbox',
  },
}

const getStoreDisplayName = (store: EStore | EPriceHistoryMetaType) => STORE_TO_STORE_NAME[store]

export { getStoreDisplayName }

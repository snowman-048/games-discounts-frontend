import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'

const STORE_TO_COLOR_MAP = {
  [EStore.PSN]: '#003087',
  [EStore.NINTENDO]: '#E4000F',
  [EStore.XBOX]: '#52b043',
  [EPriceHistoryMetaType.PS_PLUS]: '#F5D849',
}
const getStoreColor = (store: EStore | EPriceHistoryMetaType) => STORE_TO_COLOR_MAP[store]

export { getStoreColor }

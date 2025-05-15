import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'

const storeColor = {
  [EStore.PSN]: '#003087',
  [EStore.NINTENDO]: '#E4000F',
  [EStore.XBOX]: '#52b043',
  [EPriceHistoryMetaType.PS_PLUS]: '#3c3c3c',
}

export { storeColor }

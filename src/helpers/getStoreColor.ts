import { storeColor } from '@/configs/store-color.config'
import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'

const getStoreColor = (store: EStore | EPriceHistoryMetaType) => storeColor[store]

export { getStoreColor }

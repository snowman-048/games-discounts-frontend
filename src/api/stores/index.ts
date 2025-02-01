import { TStore } from '@/types/store.types'

import { api } from '..'

const BASE_URL = 'store'

const getStores = () => api.get<TStore[]>(BASE_URL)

export { getStores }

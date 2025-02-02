import { TRegionWithStores } from '@/types/region.types'

import { api } from '..'

const BASE_URL = 'region'

const getRegions = () => api.get<TRegionWithStores[]>(BASE_URL)

export { getRegions }

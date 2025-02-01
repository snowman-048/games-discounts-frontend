import { createQueryString } from '@/helpers/createQueryString'
import { TPagination, TSorting } from '@/types/api.types'
import { TGame } from '@/types/game.types'

import { api } from '..'

const BASE_URL = 'games'

const getGamesList = (params: TPagination & TSorting & { storeIds?: string[] }) =>
  api.get<[TGame[], number]>(`${BASE_URL}/${createQueryString(params)}`)

// const getGameById = async (id: number) => {
//   const regionId = store.getState().app.selectedRegionId
//   return api.get<TGame | null>(`${BASE_URL}/${id}/${regionId}`)
// }

export { getGamesList }

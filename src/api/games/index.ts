import { createQueryString } from '@/helpers/createQueryString'
import { TPagination, TSorting } from '@/types/api.types'
import { TFamilyKey } from '@/types/family-key.type'
import { TGetGameParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

import { api } from '..'

const BASE_URL = 'games'

const getGamesList = (
  params: Partial<TPagination> & TSorting & { storeIds?: string[]; onlySelectedStores?: boolean },
) => api.get<[TGame[], number]>(`${BASE_URL}/${createQueryString(params)}`)

const getGameById = async ({
  id,
  ...params
}: TGetGameParams & { id: number; storeIds?: string[] }) =>
  api.get<TGame | null>(`${BASE_URL}/${id}${createQueryString(params)}`)

const getGameFamilyByGameId = async ({
  id,
  ...params
}: TGetGameParams & { id: number; storeIds?: string[] }) =>
  api.get<TFamilyKey[] | null>(`${BASE_URL}/${id}/family${createQueryString(params)}`)

const getGamesDataForSitemap = () => api.get<{ id: number; title: string }[]>(`${BASE_URL}/sitemap`)

export { getGamesList, getGameById, getGamesDataForSitemap, getGameFamilyByGameId }

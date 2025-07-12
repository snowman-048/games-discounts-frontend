import { TGameSearchParams } from '@/types/game-search.types'

import { getGamesSorting } from './getGamesSorting'

const prepareGamesSearchQuery = (query: TGameSearchParams & { page?: number; limit?: number }) => {
  const { sort, allGames, ...rest } = query
  const storeKey = query['storeIds[]'] ? 'storeIds[]' : 'storeIds'
  const storeIds =
    query[storeKey] && (Array.isArray(query[storeKey]) ? query[storeKey] : [query[storeKey]])

  delete rest[storeKey]

  return {
    ...getGamesSorting(sort, allGames),
    ...rest,
    storeIds,
    allGames,
  }
}

export { prepareGamesSearchQuery }

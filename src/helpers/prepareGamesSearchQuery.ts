import { TGameSearchParams } from '@/types/game-search.types'

import { getGamesSorting } from './getGamesSorting'

const prepareGamesSearchQuery = (query: TGameSearchParams & { page?: number; limit?: number }) => {
  const { sort, allGames, ...rest } = query
  const storeIds =
    query['storeIds[]'] &&
    (Array.isArray(query['storeIds[]']) ? query['storeIds[]'] : [query['storeIds[]']])

  delete rest['storeIds[]']

  return {
    ...getGamesSorting(sort, allGames),
    ...rest,
    storeIds,
    allGames,
  }
}

export { prepareGamesSearchQuery }

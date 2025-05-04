import { allGamesSortingOptions, gamesSortingOptions } from '@/configs/games-sorting-options.config'
import { EGameSorting } from '@/enums/game-sorting.enum'
import { TSorting } from '@/types/api.types'

const MAPPER: Record<EGameSorting, TSorting> = {
  [EGameSorting.NEWEST]: {
    sortField: 'discountStarts',
    sortDirection: 'desc',
  },
  [EGameSorting.FINISHING]: {
    sortField: 'discountEnds',
    sortDirection: 'asc',
  },
  [EGameSorting.BIGGEST_DISCOUNTS]: {
    sortField: 'discountPercentage',
    sortDirection: 'desc',
  },
  [EGameSorting.RELEASE_DATE]: {
    sortField: 'releaseDate',
    sortDirection: 'desc',
  },
  [EGameSorting.AZ]: {
    sortField: 'title',
    sortDirection: 'asc',
  },
  [EGameSorting.ZA]: {
    sortField: 'title',
    sortDirection: 'desc',
  },
}

const getGamesSorting = (sorting?: EGameSorting, allGames = false) => {
  return sorting && MAPPER[sorting]
    ? MAPPER[sorting]
    : MAPPER[(allGames ? allGamesSortingOptions : gamesSortingOptions)[0]]
}

export { getGamesSorting }

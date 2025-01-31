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
}

const getGamesSorting = (sorting = EGameSorting.NEWEST) => {
  return MAPPER[sorting]
}

export { getGamesSorting }

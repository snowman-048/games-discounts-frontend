import { EGameSorting } from '@/enums/game-sorting.enum'

const allGamesSortingOptions = [EGameSorting.RELEASE_DATE, EGameSorting.AZ, EGameSorting.ZA]

const gamesSortingOptions = [
  EGameSorting.NEWEST,
  EGameSorting.FINISHING,
  EGameSorting.BIGGEST_DISCOUNTS,
  ...allGamesSortingOptions,
]

export { allGamesSortingOptions, gamesSortingOptions }

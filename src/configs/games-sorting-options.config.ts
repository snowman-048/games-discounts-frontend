import { EGameSorting } from '@/enums/game-sorting.enum'
import { TOption } from '@/types/option.types'

const gamesSortingOptions: TOption<EGameSorting>[] = [
  {
    title: 'Newest discounts',
    value: EGameSorting.NEWEST,
  },
  {
    title: 'Finishing discounts',
    value: EGameSorting.FINISHING,
  },
  {
    title: 'A-Z',
    value: EGameSorting.AZ,
  },
  {
    title: 'Z-A',
    value: EGameSorting.ZA,
  },
]

export { gamesSortingOptions }

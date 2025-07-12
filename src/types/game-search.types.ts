import { EGameSorting } from '@/enums/game-sorting.enum'
import { EGameType } from '@/enums/game-type.enum'

type TGetGameParams = {
  psnR?: string
  xboxR?: string
  nintendoR?: string
}

type TGameSearchParams = TGetGameParams & {
  title?: string
  types?: EGameType[]
  sort?: EGameSorting
  'storeIds[]'?: string[]
  storeIds?: string[]
  onlySelectedStores?: boolean
  dateFrom?: string
  dateTo?: string
  allGames?: boolean
  bestDiscounts?: boolean
}

export type { TGetGameParams, TGameSearchParams }

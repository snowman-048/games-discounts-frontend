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
  onlySelectedStores?: boolean
  allGames?: boolean
}

export type { TGetGameParams, TGameSearchParams }

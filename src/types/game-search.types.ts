import { EGameSorting } from '@/enums/game-sorting.enum'

type TGetGameParams = {
  psnR?: string
  xboxR?: string
  nintendoR?: string
}

type TGameSearchParams = TGetGameParams & {
  sort?: EGameSorting
  'storeIds[]'?: string[]
  onlySelectedStores?: boolean
}

export type { TGetGameParams, TGameSearchParams }

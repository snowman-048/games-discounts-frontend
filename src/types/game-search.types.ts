import { EGameSorting } from '@/enums/game-sorting.enum'

type TGameSearchParams = {
  sort?: EGameSorting
  'storeIds[]'?: string[]
  psnR?: string
  xboxR?: string
  nintendoR?: string
  onlySelectedStores?: boolean
}

export type { TGameSearchParams }

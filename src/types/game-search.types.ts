import { EGameSorting } from '@/enums/game-sorting.enum'

type TGameSearchParams = {
  sort?: EGameSorting
  'storeIds[]'?: string[]
  psnR?: string
  xboxR?: string
  nintendoR?: string
}

export type { TGameSearchParams }

import { EStore } from '@/enums/store.enum'
import { TGame } from '@/types/game.types'
import { TRegion } from '@/types/region.types'

type TSensitiveData = {
  initialPrice: number
  discountedPrice: number
  discountPercentage: number
  discountStarts: string
  region: TRegion
  discountEnds?: string
  gameLink?: string
}

type TGameDataSpecificFields = TGame & {
  discountEnds: string
  initialPrice: number
  discountStarts: string
  discountedPrice: number
  discountPercentage: number
  gameLink: string
  region: TRegion
  store: EStore
  sensitiveData: TSensitiveData[]
}

type TGameData = TGameDataSpecificFields & TGame
type TGameDataMain = Partial<TGameDataSpecificFields> & TGame

type TPendingConnection = {
  id: number
  gameData: TGameData
  gamesPendingConnectionsPotentialGames: { id: number; game: TGame }[]
}

export type { TSensitiveData, TGameDataMain, TPendingConnection, TGameData }

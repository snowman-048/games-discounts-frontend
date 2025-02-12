import { EGameType } from '@/enums/game-type.enum'
import { EPlatform } from '@/enums/platform.enum'

import { TPriceHistory } from './price-history.types'
import { TStore } from './store.types'

type TGameLink = {
  id: number
  url: string
  gameId: number
  storeId: number
  regionId: number
}

type TGameStore = {
  store: TStore
}

type TGame = {
  id: number
  title: string
  description?: string
  psnId?: string
  steamId?: string
  nintendoId?: string
  xboxId?: string
  type: EGameType
  platforms: EPlatform[]
  releaseDate?: string
  publisher?: string
  genres: string[]
  voiceLanguages: string[]
  textLanguages: string[]
  coverImageUrl?: string
  images: string[]
  gameLinks: TGameLink[]
  priceHistory: TPriceHistory[]
  gameStore?: TGameStore[]
}

export type { TGame, TGameStore }

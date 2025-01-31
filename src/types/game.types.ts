type TGameLink = {
  id: number
  url: string
  gameId: number
  storeId: number
  regionId: number
}

type TPriceHistory = {
  id: number
  meta?: any
  gameId: number
  storeId: number
  regionId: number
  discountEnds: string
  initialPrice: number
  discountStarts: string
  discountedPrice: number
  discountPercentage: number
}

type TGame = {
  id: number
  title: string
  description?: string
  psnId?: string
  steamId?: string
  nintendoId?: string
  xboxId?: string
  type: string
  platforms: string[]
  releaseDate?: string
  publisher?: string
  genres: string[]
  voiceLanguages: string[]
  textLanguages: string[]
  coverImageUrl?: string
  images: string[]
  gameLink: TGameLink[]
  priceHistory: TPriceHistory[]
}

export type { TGame }

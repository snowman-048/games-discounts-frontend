type TWebsiteGamesArticle = {
  focusKeyphrase: string[]
  games: {
    id: number
    title: string
    persent: number
    coverImageUrl: string
    description?: string
    ratings: Record<string, number>
  }[]
  keywords: string[]
}

type TWebsiteGeneralArticle = {
  focusKeyphrase: string
  html: string
  keywords: string[]
  sourceUrl: string
}

type TArticle<T = TWebsiteGamesArticle | TWebsiteGeneralArticle> = {
  id: number
  title: string
  articleDescription: string
  metaDescription: string
  articleDesktopImage?: string
  articleMobileImage?: string
  website: T
  social: {
    text: string
    hashtags: string[]
  }
  createdAt: string
  published?: boolean
  publishedAt?: string
}

export type { TWebsiteGeneralArticle, TWebsiteGamesArticle, TArticle }

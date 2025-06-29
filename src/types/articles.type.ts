type TArticle = {
  id: number
  title: string
  articleDescription: string
  metaDescription: string
  articleDesktopImage?: string
  articleMobileImage?: string
  website: {
    focusKeyphrases: string[]
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
  social: {
    text: string
    hashtags: string[]
  }
  published?: boolean
  createdAt: string
}

export type { TArticle }

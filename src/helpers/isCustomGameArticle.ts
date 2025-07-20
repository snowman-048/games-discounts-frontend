import { TArticle } from '@/types/articles.type'

const isCustomGameArticle = (article: TArticle) => !!(article.website as any).games?.length

export { isCustomGameArticle }

import { createQueryString } from '@/helpers/createQueryString'
import { TArticle } from '@/types/articles.type'

import { api } from '..'
import { TArticlesQueryParams } from './types'

const BASE_URL = 'article'

const getArticles = (params?: TArticlesQueryParams) =>
  api.get<{ data: TArticle[]; total: number }>(`${BASE_URL}${createQueryString(params)}`)

const getArticleById = (id: number) => api.get<TArticle>(`${BASE_URL}/${id}`)

export { getArticles, getArticleById }

import { EStore } from '@/enums/store.enum'
import { createQueryString } from '@/helpers/createQueryString'
import { TArticle } from '@/types/articles.type'

import { api } from '..'
import { TArticlesQueryParams } from './types'

const BASE_URL = 'article'

const getArticles = (params?: TArticlesQueryParams) =>
  api.get<{ data: TArticle[]; total: number }>(`${BASE_URL}${createQueryString(params)}`)

const getUnpublishedArticles = (params?: TArticlesQueryParams) =>
  api.get<{ data: TArticle[]; total: number }>(
    `${BASE_URL}/unpublished${createQueryString(params)}`,
  )

const getArticleById = (id: number) => api.get<TArticle>(`${BASE_URL}/${id}`)

const publishArticle = (id: number) => api.put<TArticle>(`${BASE_URL}/${id}/publish`)

const unpublishArticle = (id: number) => api.put<TArticle>(`${BASE_URL}/${id}/unpublish`)

const generateArticle = (store: EStore) => api.post<TArticle>(`${BASE_URL}/generate`, { store })

const deleteArticle = (id: number) => api.delete(`${BASE_URL}/${id}`)

export {
  getArticles,
  getUnpublishedArticles,
  getArticleById,
  publishArticle,
  unpublishArticle,
  generateArticle,
  deleteArticle,
}

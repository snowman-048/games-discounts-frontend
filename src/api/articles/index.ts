import { EStore } from '@/enums/store.enum'
import { createQueryString } from '@/helpers/createQueryString'
import { TPagination } from '@/types/api.types'
import { TArticle } from '@/types/articles.type'

import { api } from '..'
import { TArticlesQueryParams } from './types'

const BASE_URL = 'article'

const getArticles = (params?: TArticlesQueryParams) =>
  api.get<{ data: TArticle[]; total: number }>(`${BASE_URL}${createQueryString(params)}`)

const getArticlesCount = () => api.get<number>(`${BASE_URL}/count`)

const getArticlesDataForSitemap = (query: TPagination) =>
  api.get<{ id: number; title: string; publishedAt: string }[]>(
    `${BASE_URL}/sitemap${createQueryString(query)}`,
  )

const getUnpublishedArticles = (params?: TArticlesQueryParams) =>
  api.get<{ data: TArticle[]; total: number }>(
    `${BASE_URL}/unpublished${createQueryString(params)}`,
  )

const getArticleById = (id: number) => api.get<TArticle>(`${BASE_URL}/${id}`)

const publishArticle = (id: number) => api.put<TArticle>(`${BASE_URL}/${id}/publish`)

const unpublishArticle = (id: number) => api.put<TArticle>(`${BASE_URL}/${id}/unpublish`)

const updateArticle = (id: number, data: TArticle) => api.put<TArticle>(`${BASE_URL}/${id}`, data)

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
  getArticlesCount,
  getArticlesDataForSitemap,
  updateArticle,
}

import { TPagination, TSorting } from '@/types/api.types'

type TArticlesQueryParams = TPagination & Partial<TSorting> & { published?: boolean }

export type { TArticlesQueryParams }

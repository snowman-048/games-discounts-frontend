import { Stack } from '@mui/material'

import { getArticles } from '@/api/articles'
import { ArticlesList } from '@/components/articles-list'
import { NoDataLabel } from '@/components/no-data-label'
import { Pagination } from '@/components/pagination'
import { EAppRoute } from '@/enums/app-route.enum'
import { TArticle } from '@/types/articles.type'

type TProps = {
  page: string | number
}

const LIST_SIZE = 9

const ArticlesListWithFetch = async ({ page }: TProps) => {
  let articles: TArticle[] = []
  let totalCount = 0

  try {
    const { data } = await getArticles({
      page: +page,
      limit: LIST_SIZE,
      sortField: 'createdAt',
      sortDirection: 'desc',
    })

    articles = data.data
    totalCount = data.total
  } catch (err) {
    console.log('Articles fetch error', (err as any).message)
  }

  if (!articles.length) {
    return <NoDataLabel />
  }

  return (
    <Stack gap={5} alignItems="center" justifyContent="space-between">
      <ArticlesList articles={articles} />
      <Pagination
        count={Math.ceil(totalCount / LIST_SIZE)}
        page={+page}
        path={EAppRoute.ARTICLES}
      />
    </Stack>
  )
}

export { ArticlesListWithFetch }

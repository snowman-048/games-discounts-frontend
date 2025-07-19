import { Suspense } from 'react'

import { Stack } from '@mui/material'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { getArticles } from '@/api/articles'
import { MultiplexGridAd } from '@/components/ads/multiplex-grid-ad'
import { ArticlesList } from '@/components/articles-list'
import { NoDataLabel } from '@/components/no-data-label'
import { Pagination } from '@/components/pagination'
import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { EPlatform } from '@/enums/platform.enum'
import { EStore } from '@/enums/store.enum'
import { getLocalesMeta } from '@/helpers/getLocalesMeta'
import { TArticle } from '@/types/articles.type'

type TProps = {
  params: Promise<{ page: string }>
}

const LIST_SIZE = 9

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { page } = await params

  return {
    title: 'Articles',
    keywords: [
      'articles',
      'posts',
      'read',
      'price',
      'low',
      'games',
      'video games',
      ...Object.values(EStore),
      ...Object.values(EPlatform),
    ],
    other: {
      robots: 'index, follow',
    },
    icons: {
      other: getLocalesMeta(`${EAppRoute.ARTICLES}/${page}`),
    },
  }
}

const ArticlesPage = async ({ params }: TProps) => {
  const t = await getTranslations('articles')

  const { page } = await params

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
    console.log('Games fetch error', (err as any).message)
  }

  if (!articles.length) {
    return <NoDataLabel />
  }

  return (
    <Container gap={2} paddingBottom={2}>
      <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1" width="100%">
        {t('title')}
      </TypographyV2>

      <Stack gap={5} alignItems="center" justifyContent="space-between">
        <Suspense key={page} fallback={<Loader />}>
          <ArticlesList articles={articles} />
        </Suspense>
        <Pagination
          count={Math.ceil(totalCount / LIST_SIZE)}
          page={+page}
          path={EAppRoute.ARTICLES}
        />
      </Stack>

      <MultiplexGridAd />
    </Container>
  )
}

export default ArticlesPage

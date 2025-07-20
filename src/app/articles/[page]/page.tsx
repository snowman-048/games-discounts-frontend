import { Suspense } from 'react'

import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { MultiplexGridAd } from '@/components/ads/multiplex-grid-ad'
import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { EPlatform } from '@/enums/platform.enum'
import { EStore } from '@/enums/store.enum'
import { getLocalesMeta } from '@/helpers/getLocalesMeta'

import { ArticlesListWithFetch } from './libs/components/articles-list-with-fetch'

type TProps = {
  params: Promise<{ page: string }>
}

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

  return (
    <Container gap={2} paddingBottom={2}>
      <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1" width="100%">
        {t('title')}
      </TypographyV2>

      <Suspense key={page} fallback={<Loader />}>
        <ArticlesListWithFetch page={+page} />
      </Suspense>

      <MultiplexGridAd />
    </Container>
  )
}

export default ArticlesPage

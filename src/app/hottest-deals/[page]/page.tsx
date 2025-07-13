import { Suspense } from 'react'

import { Stack } from '@mui/material'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { GamesFilters } from '@/components/games-filters'
import { GamesListWithServerFetch } from '@/components/games-list-with-server-fetch'
import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { EPlatform } from '@/enums/platform.enum'
import { EStore } from '@/enums/store.enum'
import { getLocalesMeta } from '@/helpers/getLocalesMeta'
import { TGameSearchParams } from '@/types/game-search.types'

type TProps = {
  params: Promise<{ page: string }>
  searchParams: Promise<TGameSearchParams>
}

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { page } = await params

  return {
    title: 'Hottest Deals',
    keywords: [
      'hottest game deals',
      'biggest game discounts',
      'best video game deals',
      'top game price drops',
      'all-time lowest game prices',
      'record low video game prices',
      'deepest game discounts',
      'huge video game savings',
      'unbeatable game deals',
      'must-have game discounts',
      'video game mega sale',
      'top discounted games',
      'best ever game deals',
      'game deals of the year',
      'video game flash sale',
      ...Object.values(EPlatform),
      ...Object.values(EPlatform).map((platform) => `hottest ${platform} deals`),
      ...Object.values(EPlatform).map((platform) => `biggest discounts on ${platform}`),
      ...Object.values(EStore),
      ...Object.values(EStore).map((store) => `hottest deals on ${store}`),
      ...Object.values(EStore).map((store) => `biggest discounts on ${store}`),
    ],
    other: {
      robots: 'index, follow',
    },
    icons: {
      other: getLocalesMeta(`${EAppRoute.HOTTEST_DEALS}/${page}`),
    },
  }
}

const HottestDeals = async ({ params, searchParams }: TProps) => {
  const t = await getTranslations('HottestDeals')
  const { page } = await params
  const query = await searchParams

  return (
    <Container gap={{ xs: 2, md: 5 }}>
      <Stack gap={2} width="100%">
        <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1">
          {t('title')}
        </TypographyV2>
        <GamesFilters redirectPath={EAppRoute.HOTTEST_DEALS} />
      </Stack>
      <Suspense key={`${page}${JSON.stringify(query)}`} fallback={<Loader />}>
        <GamesListWithServerFetch
          query={query}
          page={+page}
          paginationPath={EAppRoute.HOTTEST_DEALS}
          bestDiscounts
        />
      </Suspense>
    </Container>
  )
}

export default HottestDeals

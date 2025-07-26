// import { Suspense } from 'react'
import { Stack } from '@mui/material'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { GamesFilters } from '@/components/games-filters'
// import { GamesListLoader } from '@/components/games-list-loader'
import { GamesListWithServerFetch } from '@/components/games-list-with-server-fetch'
import { Container } from '@/components/ui/container'
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
    title: 'Active Discounts',
    keywords: [
      'active game discounts',
      'video game discounts',
      'discounted games',
      'game deals',
      'best game deals',
      'game price drops',
      'cheap video games',
      'lowest game prices',
      'game sale',
      'game promotions',
      'latest game discounts',
      'current video game deals',
      ...Object.values(EPlatform),
      ...Object.values(EPlatform).map((platform) => `${platform} game discounts`),
      ...Object.values(EPlatform).map((platform) => `discounted ${platform} games`),
      ...Object.values(EStore),
      ...Object.values(EStore).map((store) => `${store} discounts`),
      ...Object.values(EStore).map((store) => `discounted games on ${store}`),
    ],
    other: {
      robots: 'index, follow',
    },
    icons: {
      other: getLocalesMeta(`${EAppRoute.ACTIVE_DISCOUNTS}/${page}`),
    },
  }
}

const ActiveDiscounts = async ({ params, searchParams }: TProps) => {
  const t = await getTranslations('ActiveDiscounts')
  const { page } = await params
  const query = await searchParams

  return (
    <Container gap={{ xs: 2, md: 5 }}>
      <Stack gap={2} width="100%">
        <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1">
          {t('title')}
        </TypographyV2>
        <GamesFilters redirectPath={EAppRoute.ACTIVE_DISCOUNTS} />
      </Stack>
      {/* <Suspense key={`${page}${JSON.stringify(query)}`} fallback={<GamesListLoader />}> */}
      <GamesListWithServerFetch
        query={query}
        page={+page}
        paginationPath={EAppRoute.ACTIVE_DISCOUNTS}
      />
      {/* </Suspense> */}
    </Container>
  )
}

export default ActiveDiscounts

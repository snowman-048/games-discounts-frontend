import { Suspense } from 'react'

import { Stack } from '@mui/material'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { GamesFilters } from '@/components/games-filters'
import { GamesList } from '@/components/games-list'
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
    title: 'Active Discounts',
    keywords: [
      'discounts',
      'price',
      'low',
      'games',
      'video games',
      ...Object.values(EStore),
      ...Object.values(EPlatform),
    ],
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
      <Suspense key={`${page}${JSON.stringify(query)}`} fallback={<Loader />}>
        <GamesList query={query} page={+page} paginationPath={EAppRoute.ACTIVE_DISCOUNTS} />
      </Suspense>
    </Container>
  )
}

export default ActiveDiscounts

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
    title: 'Explore Video Games',
    keywords: [
      'discounts',
      'price',
      'games',
      'video games',
      'search',
      'explore',
      ...Object.values(EStore),
      ...Object.values(EPlatform),
    ],
    other: {
      robots: 'index, follow',
    },
    icons: {
      other: getLocalesMeta(`${EAppRoute.ALL_GAMES}/${page}`),
    },
  }
}

const AllGames = async ({ params, searchParams }: TProps) => {
  const t = await getTranslations('AllGames')
  const { page } = await params
  const query = await searchParams

  return (
    <Container gap={{ xs: 2, md: 5 }}>
      <Stack gap={2} width="100%">
        <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1">
          {t('title')}
        </TypographyV2>
        <GamesFilters redirectPath={EAppRoute.ALL_GAMES} noDiscountsFilters />
      </Stack>
      <Suspense key={`${page}${JSON.stringify(query)}`} fallback={<Loader />}>
        <GamesList query={query} page={+page} paginationPath={EAppRoute.ALL_GAMES} allGames />
      </Suspense>
    </Container>
  )
}

export default AllGames

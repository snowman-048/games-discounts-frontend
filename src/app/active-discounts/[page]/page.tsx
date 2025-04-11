import { Suspense } from 'react'

import { Metadata } from 'next'

import { GamesFilters } from '@/components/games-filters'
import { GamesList } from '@/components/games-list'
import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
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

const Discounts = async ({ params, searchParams }: TProps) => {
  const { page } = await params
  const query = await searchParams

  return (
    <Container gap={{ xs: 2, md: 5 }}>
      <GamesFilters />
      <Suspense key={`${page}${JSON.stringify(query)}`} fallback={<Loader />}>
        <GamesList query={query} page={+page} paginationPath={EAppRoute.ACTIVE_DISCOUNTS} />
      </Suspense>
    </Container>
  )
}

export default Discounts

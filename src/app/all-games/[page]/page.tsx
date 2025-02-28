import { Suspense } from 'react'

import { Metadata } from 'next'

import { GamesFilters } from '@/components/games-filters'
import { GamesList } from '@/components/games-list'
import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
import { EAppRoute } from '@/enums/app-route.enum'
import { EPlatform } from '@/enums/platform.enum'
import { EStore } from '@/enums/store.enum'
import { TGameSearchParams } from '@/types/game-search.types'

export const metadata: Metadata = {
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
}

type Tprops = {
  params: Promise<{ page: string }>
  searchParams: Promise<TGameSearchParams>
}

const AllGames = async ({ params, searchParams }: Tprops) => {
  const { page } = await params
  const query = await searchParams

  return (
    <Container gap={{ xs: 2, md: 5 }}>
      <GamesFilters usedForAllGames />
      <Suspense key={`${page}${JSON.stringify(query)}`} fallback={<Loader />}>
        <GamesList query={query} page={+page} paginationPath={EAppRoute.ALL_GAMES} allGames />
      </Suspense>
    </Container>
  )
}

export default AllGames

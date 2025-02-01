import { Suspense } from 'react'

import { GameDiscountsFilters } from '@/components/game-discounts-filters'
import { GamesDiscountsList } from '@/components/games-discounts-list'
import { Container } from '@/components/ui/container'
import { EAppRoute } from '@/enums/app-route.enum'
import { EGameSorting } from '@/enums/game-sorting.enum'

const Discounts = async ({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>
  searchParams: Promise<{
    p?: string
    region?: string
    sort?: EGameSorting
    'storeIds[]': string[]
  }>
}) => {
  const { page } = await params
  const query = await searchParams

  return (
    <Container padding={2} alignItems="center" gap={5}>
      <GameDiscountsFilters />
      <Suspense key={`${page}${JSON.stringify(query)}`} fallback={<div>Loading...</div>}>
        <GamesDiscountsList
          query={query}
          page={+page}
          paginationPath={EAppRoute.ACTIVE_DISCOUNTS}
        />
      </Suspense>
    </Container>
  )
}

export default Discounts

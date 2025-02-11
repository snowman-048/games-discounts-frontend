import { Suspense } from 'react'

import { GameDiscountsFilters } from '@/components/game-discounts-filters'
import { GamesDiscountsList } from '@/components/games-discounts-list'
import { Container } from '@/components/ui/container'
import { EAppRoute } from '@/enums/app-route.enum'
import { TGameSearchParams } from '@/types/game-search.types'

const Discounts = async ({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>
  searchParams: Promise<TGameSearchParams>
}) => {
  const { page } = await params
  const query = await searchParams

  return (
    <Container gap={{ xs: 2, md: 5 }}>
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

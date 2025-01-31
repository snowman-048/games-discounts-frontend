import { Grid2 } from '@mui/material'

import { getGamesList } from '@/api/games'
import { GameDiscountCard } from '@/components/game-discount-card'
import { GameDiscountsFilters } from '@/components/game-discounts-filters'
import { Pagination } from '@/components/pagination'
import { EAppRoute } from '@/enums/app-route.enum'
import { EGameSorting } from '@/enums/game-sorting.enum'
import { getGamesSorting } from '@/helpers/getGamesSorting'
import { TGame } from '@/types/game.types'

const LIST_SIZE = 24

const Discounts = async ({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>
  searchParams: Promise<{ p?: string; region?: string; sort?: EGameSorting }>
}) => {
  const { page } = await params
  const query = await searchParams

  let games: TGame[] = []
  let totalGames = 0

  try {
    const { data } = await getGamesList({
      ...getGamesSorting(query.sort),
      page: +page,
      limit: LIST_SIZE,
      regionId: 24,
    })
    games = data[0]
    totalGames = data[1]
  } catch (err) {
    console.log('Games fetch error', (err as any).message)
  }

  return (
    <Grid2
      padding={2}
      flexDirection="column"
      container
      alignItems="center"
      gap={5}
      maxWidth={1200}
      margin="0 auto"
    >
      <GameDiscountsFilters />

      <Grid2 display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4}>
        {games.map((game) => (
          <GameDiscountCard game={game} key={game.id} />
        ))}
      </Grid2>

      <Pagination
        count={Math.ceil(totalGames / LIST_SIZE)}
        page={+page}
        path={EAppRoute.ACTIVE_DISCOUNTS}
      />
    </Grid2>
  )
}

export default Discounts

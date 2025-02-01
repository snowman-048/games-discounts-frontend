import { Grid2 } from '@mui/material'

import { getGamesList } from '@/api/games'
import { EGameSorting } from '@/enums/game-sorting.enum'
import { getGamesSorting } from '@/helpers/getGamesSorting'
import { TGame } from '@/types/game.types'

import { GameDiscountCard } from '../game-discount-card'
import { Pagination } from '../pagination'

const LIST_SIZE = 24

type TProps = {
  page: number
  paginationPath: string
  query: {
    p?: string
    region?: string
    sort?: EGameSorting
    'storeIds[]': string[]
  }
}

const GamesDiscountsList = async ({ page, paginationPath, query }: TProps) => {
  let games: TGame[] = []
  let totalGames = 0

  try {
    const { sort, ...rest } = query
    const storeIds =
      query['storeIds[]'] &&
      (Array.isArray(query['storeIds[]']) ? query['storeIds[]'] : [query['storeIds[]']])

    const { data } = await getGamesList({
      ...getGamesSorting(sort),
      ...rest,
      page,
      limit: LIST_SIZE,
      storeIds,
    })
    games = data[0]
    totalGames = data[1]
  } catch (err) {
    console.log('Games fetch error', (err as any).message)
  }

  return (
    <Grid2 container flexDirection="column" alignItems="center" gap={5}>
      <Grid2 display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4}>
        {games.map((game) => (
          <GameDiscountCard game={game} key={game.id} />
        ))}
      </Grid2>

      <Pagination count={Math.ceil(totalGames / LIST_SIZE)} page={+page} path={paginationPath} />
    </Grid2>
  )
}

export { GamesDiscountsList }

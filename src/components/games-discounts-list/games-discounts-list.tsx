import { Grid2 } from '@mui/material'

import { getGamesList } from '@/api/games'
import { getGamesSorting } from '@/helpers/getGamesSorting'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

import { GameDiscountCard } from '../game-discount-card'
import { NoDataLabel } from '../no-data-label'
import { Pagination } from '../pagination'
import styles from './styles.module.scss'

const LIST_SIZE = 25

type TProps = {
  page: number
  paginationPath: string
  query: TGameSearchParams
}

const GamesDiscountsList = async ({ page, paginationPath, query }: TProps) => {
  let games: TGame[] = []
  let totalGames = 0

  try {
    const { sort, ...rest } = query
    const storeIds =
      query['storeIds[]'] &&
      (Array.isArray(query['storeIds[]']) ? query['storeIds[]'] : [query['storeIds[]']])

    delete rest['storeIds[]']

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

  if (!games.length) {
    return <NoDataLabel />
  }

  return (
    <Grid2
      container
      flexDirection="column"
      alignItems="center"
      width="100%"
      gap={5}
      paddingBottom={3}
    >
      <Grid2 display="grid" width="100%" className={styles.list} gap={2.5}>
        {games.map((game) => (
          <GameDiscountCard game={game} key={game.id} />
        ))}
      </Grid2>

      <Pagination count={Math.ceil(totalGames / LIST_SIZE)} page={+page} path={paginationPath} />
    </Grid2>
  )
}

export { GamesDiscountsList }

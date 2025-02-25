import { Grid2 } from '@mui/material'

import { getGamesList } from '@/api/games'
import { prepareGamesSearchQuery } from '@/helpers/prepareGamesSearchQuery'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

import { GameCard } from '../game-card'
import { NoDataLabel } from '../no-data-label'
import { Pagination } from '../pagination'
import styles from './styles.module.scss'

const LIST_SIZE = 25

type TProps = {
  page: number
  paginationPath: string
  query: TGameSearchParams
  allGames?: boolean
}

const GamesList = async ({ page, paginationPath, query, allGames }: TProps) => {
  let games: TGame[] = []
  let totalGames = 0

  try {
    const { data } = await getGamesList(
      prepareGamesSearchQuery({ ...query, page, limit: LIST_SIZE, allGames }),
    )

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
      <Grid2 display="grid" width="100%" className={styles.list} gap={{ xs: 2, md: 2.5 }}>
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </Grid2>

      <Pagination count={Math.ceil(totalGames / LIST_SIZE)} page={+page} path={paginationPath} />
    </Grid2>
  )
}

export { GamesList }

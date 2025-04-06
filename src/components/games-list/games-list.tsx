import { Grid2 } from '@mui/material'
import { getTranslations } from 'next-intl/server'

import { getGamesList } from '@/api/games'
import { prepareGamesSearchQuery } from '@/helpers/prepareGamesSearchQuery'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

import { GameCard } from '../game-card'
import { GameCardsList } from '../game-cards-list'
import { NoDataLabel } from '../no-data-label'
import { Pagination } from '../pagination'

const LIST_SIZE = 25

type TProps = {
  page: number
  paginationPath: string
  query: TGameSearchParams
  allGames?: boolean
}

const GamesList = async ({ page, paginationPath, query, allGames }: TProps) => {
  const t = await getTranslations()

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
      <GameCardsList>
        {games.map((game) => (
          <GameCard game={game} key={game.id} t={t} switchToListOnMobile />
        ))}
      </GameCardsList>

      <Pagination count={Math.ceil(totalGames / LIST_SIZE)} page={+page} path={paginationPath} />
    </Grid2>
  )
}

export { GamesList }

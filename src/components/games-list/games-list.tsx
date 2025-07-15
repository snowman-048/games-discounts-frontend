import { Grid2 } from '@mui/material'

import { TGame } from '@/types/game.types'

import { GameCardAd } from '../ads/game-card-ad'
import { GameCard } from '../game-card'
import { GameCardsList } from '../game-cards-list'
import { NoDataLabel } from '../no-data-label'
import { Pagination } from '../pagination'

type TProps = {
  games: TGame[]
  totalGames: number
  page: number
  paginationPath: string
  t: any
  getGameHref?: (game: TGame) => string
  listSize?: number
}

const GamesList = ({
  games,
  totalGames,
  page,
  paginationPath,
  t,
  getGameHref,
  listSize = 25,
}: TProps) => {
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
          <GameCard
            game={game}
            key={game.id}
            t={t}
            switchToListOnMobile
            customHref={getGameHref?.(game)}
          />
        ))}
        <GameCardAd />
      </GameCardsList>

      <Pagination count={Math.ceil(totalGames / listSize)} page={+page} path={paginationPath} />
    </Grid2>
  )
}

export { GamesList }

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

const AD_CARDS_AMOUNT = 2

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

  const gamesWithAds: (TGame | string)[] = [...games]

  for (let i = 0; i < AD_CARDS_AMOUNT; i++) {
    const randomIndex = Math.floor(Math.random() * gamesWithAds.length)
    gamesWithAds.splice(randomIndex, 0, 'ad')
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
        {gamesWithAds.map((item, index) =>
          typeof item === 'string' ? (
            <GameCardAd key={index} />
          ) : (
            <GameCard
              game={item}
              key={item.id}
              t={t}
              switchToListOnMobile
              customHref={getGameHref?.(item)}
            />
          ),
        )}
      </GameCardsList>

      <Pagination count={Math.ceil(totalGames / listSize)} page={+page} path={paginationPath} />
    </Grid2>
  )
}

export { GamesList }

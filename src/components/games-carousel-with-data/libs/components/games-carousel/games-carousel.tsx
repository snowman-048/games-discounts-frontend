import { Grid2 } from '@mui/material'
import { getTranslations } from 'next-intl/server'

import { getGamesList } from '@/api/games'
import { GameCard } from '@/components/game-card'
import { NoDataLabel } from '@/components/no-data-label'
import { Carousel } from '@/components/ui/carousel'
import { prepareGamesSearchQuery } from '@/helpers/prepareGamesSearchQuery'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

type TProps = {
  query: TGameSearchParams
}

const ITEMS_COUNT = 10

const GamesCarousel = async ({ query }: TProps) => {
  const t = await getTranslations()

  let games: TGame[] = []

  try {
    const { data } = await getGamesList(
      prepareGamesSearchQuery({ ...query, page: 1, limit: ITEMS_COUNT }),
    )
    games = data[0]
  } catch (err) {
    console.log('Games fetch error', (err as any).message)
  }

  if (!games.length) {
    return <NoDataLabel sx={{ marginTop: 2 }} />
  }

  return (
    <Carousel
      loop
      align="center"
      controlsContainerProps={{ px: 2 }}
      showCounter={false}
      buttonsPosition="sides"
      slides={games.map((game) => (
        <Grid2 width="300px" height="100%" paddingTop={2} key={game.id}>
          <GameCard game={game} t={t} noShadow noBlur />
        </Grid2>
      ))}
    />
  )
}

export { GamesCarousel }

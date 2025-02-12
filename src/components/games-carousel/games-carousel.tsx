import { ReactNode } from 'react'

import { Grid2, Stack } from '@mui/material'

import { getGamesList } from '@/api/games'
import { prepareGamesSearchQuery } from '@/helpers/prepareGamesSearchQuery'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

import { GameDiscountCard } from '../game-discount-card'
import { SectionTitle } from '../section-title'
import { GlassCard } from '../ui/cards/glass-card'
import { Carousel } from '../ui/carousel'

const ITEMS_COUNT = 10

type TProps = {
  title: string | ReactNode
  query: TGameSearchParams
}

const GamesCarousel = async ({ title, query }: TProps) => {
  let games: TGame[] = []

  try {
    const { data } = await getGamesList(
      prepareGamesSearchQuery({ ...query, page: 1, limit: ITEMS_COUNT }),
    )
    games = data[0]
  } catch (err) {
    console.log('Games fetch error', (err as any).message)
  }

  return (
    <GlassCard style={{ width: '100%' }}>
      <Stack padding={2} width="100%" gap={3}>
        <SectionTitle title={title} />

        <Grid2 mx={-2}>
          <Carousel
            loop
            align="center"
            controlsContainerProps={{ px: 2 }}
            showCounter={false}
            buttonsPosition="sides"
            slides={games.map((game) => (
              <Grid2 width="240px" height="100%">
                <GameDiscountCard game={game} key={game.id} />
              </Grid2>
            ))}
          />
        </Grid2>
      </Stack>
    </GlassCard>
  )
}

export { GamesCarousel }

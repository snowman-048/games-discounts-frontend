import { Grid2 } from '@mui/material'

import { GAMES_CAROUSEL_SIZE } from '@/configs/games-list.config'

import { GameCardSkeleton } from '../skeletons/game-card-skeleton'
import { Carousel } from '../ui/carousel'

const GamesCarouselLoader = () => {
  return (
    <Carousel
      align="center"
      controlsContainerProps={{ px: 2 }}
      showCounter={false}
      buttonsPosition="sides"
      withLoading={false}
      slides={Array.from({ length: GAMES_CAROUSEL_SIZE }).map((_, index) => (
        <Grid2 width="300px" minWidth="300px" height="100%" paddingTop={2} key={index}>
          <GameCardSkeleton />
        </Grid2>
      ))}
    />
  )
}

export { GamesCarouselLoader }

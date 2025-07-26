import { Box, Grid2 } from '@mui/material'

import { GameCardSkeleton } from '../skeletons/game-card-skeleton'

const GamesCarouselLoader = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '401.19px' }}>
      <Grid2
        container
        flexWrap="nowrap"
        sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid2 width="324px" minWidth="300px" paddingTop={2} paddingLeft={3} key={index}>
            <GameCardSkeleton />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export { GamesCarouselLoader }

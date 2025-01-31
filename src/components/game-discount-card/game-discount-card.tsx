import { Box, Grid2, Typography } from '@mui/material'
import Image from 'next/image'

import { TGame } from '@/types/game.types'

import { VolumetricCard } from '../volumetric-card'

type TProps = {
  game: TGame
}

const GameDiscountCard = ({ game }: TProps) => {
  return (
    <VolumetricCard>
      <Grid2 container flexDirection="column" position="relative" height="100%">
        <Grid2 sx={{ aspectRatio: 1, overflow: 'hidden' }}>
          {!!game.coverImageUrl && (
            <Image
              src={game.coverImageUrl}
              alt={game.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </Grid2>
        <Grid2
          padding={1}
          flex={1}
          container
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            color="accent.main"
            fontWeight="bold"
            variant="body1"
            letterSpacing={4}
            textAlign="center"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              background: 'rgba(0,0,0,0.7)',
            }}
          >
            {game.type.toUpperCase()}
          </Typography>
          <Typography color="text.primary" fontWeight="bold" variant="body2" textAlign="center">
            {game.title}
          </Typography>
        </Grid2>
      </Grid2>
    </VolumetricCard>
  )
}

export { GameDiscountCard }

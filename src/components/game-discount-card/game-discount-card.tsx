import { Grid2, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import { TGame } from '@/types/game.types'

import { DiscountInfo } from '../discount-info'
import { GlassCard } from '../ui/cards/glass-card'

type TProps = {
  game: TGame
}

const GameDiscountCard = ({ game }: TProps) => {
  return (
    <GlassCard>
      <Grid2
        container
        flexDirection="column"
        position="relative"
        height="100%"
        width="100%"
        padding={1}
        gap={1}
      >
        <Grid2
          sx={{
            aspectRatio: 1,
            overflow: 'hidden',
            width: '100%',
            borderRadius: 3,
            position: 'relative',
          }}
        >
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
          flex={1}
          container
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
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
              background: 'rgba(0,0,0,0.6)',
            }}
          >
            {game.type.toUpperCase()}
          </Typography>
          <Typography color="text.primary" fontWeight="bold" variant="body2" textAlign="center">
            {game.title}
          </Typography>
          <Stack spacing={1} marginTop={1} width="100%">
            {game.priceHistory.map((item) => (
              <DiscountInfo discount={item} key={item.id} />
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </GlassCard>
  )
}

export { GameDiscountCard }

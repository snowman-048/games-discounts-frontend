import { Grid2, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'
import { getGameTitleForLink } from '@/helpers/getGameTitleForLink'
import { getStoreColor } from '@/helpers/getStoreColor'
import { TGame } from '@/types/game.types'
import { TPriceHistory } from '@/types/price-history.types'

import { DiscountInfo } from '../discount-info'
import { GlassCard } from '../ui/cards/glass-card'
import styles from './styles.module.scss'

type TProps = {
  game: TGame
}

const GameDiscountCard = ({ game }: TProps) => {
  const getColor = (item: TPriceHistory) => {
    return getStoreColor(item.meta?.type || item.store.name)
  }

  const glow =
    game.priceHistory.length === 1
      ? getColor(game.priceHistory[0])
      : `linear-gradient(180deg, ${game.priceHistory.map((item, index) => `${getColor(item)} ${Math.floor(((index + 1) / game.priceHistory.length) * 100)}%`).join(', ')})`

  return (
    <Link
      href={`/${EAppRoute.GAME}/${game.id}/${getGameTitleForLink(game.title)}`}
      className={styles.wrapper}
      style={
        {
          '--glow': glow,
        } as any
      }
    >
      <GlassCard className={styles.card}>
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
    </Link>
  )
}

export { GameDiscountCard }

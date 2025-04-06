import { Box, Grid2, Stack } from '@mui/material'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import { TPendingConnection } from '@/api/pending-connections/types'
import { EAppRoute } from '@/enums/app-route.enum'
import { getGameTitleForLink } from '@/helpers/getGameTitleForLink'
import { getStoreColor } from '@/helpers/getStoreColor'
import { TGame } from '@/types/game.types'
import { TPriceHistory } from '@/types/price-history.types'

import { AddToWishlistButton } from '../add-to-wishlist-button'
import { DiscountInfo } from '../discount-info'
import { RemoveFromWishlistButton } from '../remove-from-wishlist-button'
import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'
import styles from './styles.module.scss'

type TProps = {
  game: TGame | TPendingConnection
  t: any
  noShadow?: boolean
  variant?: 'card' | 'list-item'
  onClick?: () => void
  className?: string
  switchToListOnMobile?: boolean
  wishlistButtonType?: 'add' | 'remove'
  removeFromWishlistId?: number
  onRemoveGameFromWishlist?: (gameId: number) => void
}

const GameCard = ({
  game: rawGame,
  t,
  variant = 'card',
  onClick,
  className,
  noShadow,
  switchToListOnMobile = false,
  wishlistButtonType = 'add',
  removeFromWishlistId,
  onRemoveGameFromWishlist,
}: TProps) => {
  const isPendingConnection = 'gameData' in rawGame
  const game = isPendingConnection ? rawGame.gameData : rawGame
  const getColor = (item: TPriceHistory) => {
    return getStoreColor(item.meta?.type || item.store.name)
  }

  const glow = game.priceHistory
    ? game.priceHistory.length === 1
      ? getColor(game.priceHistory[0])
      : `linear-gradient(180deg, ${game.priceHistory.map((item, index) => `${getColor(item)} ${Math.floor(((index + 1) / game.priceHistory.length) * 100)}%`).join(', ')})`
    : 'none'

  return (
    <Box className={cn(styles.wrapper, className)}>
      {!isPendingConnection && (
        <Box
          sx={{
            position: 'absolute',
            top: -15,
            right: { xs: switchToListOnMobile ? 0 : -15, sm: -15 },
            left: { xs: switchToListOnMobile ? -5 : 'auto', sm: 'auto' },
            zIndex: 2,
          }}
        >
          {wishlistButtonType === 'add' && <AddToWishlistButton game={game} />}
          {wishlistButtonType === 'remove' && !!removeFromWishlistId && (
            <RemoveFromWishlistButton
              game={game}
              wishlistId={removeFromWishlistId}
              onRemoveGame={onRemoveGameFromWishlist}
            />
          )}
        </Box>
      )}
      <Link
        href={
          isPendingConnection
            ? `/${EAppRoute.RESOLVE_PENDING_CONNECTION}/${rawGame.id}/${getGameTitleForLink(rawGame.gameData.title)}`
            : `/${EAppRoute.GAME}/${game.id}/${getGameTitleForLink(game.title)}`
        }
        style={
          {
            '--glow': glow,
            flex: 1,
          } as any
        }
        onClick={onClick}
      >
        <GlassCard
          className={cn(styles.card, styles[variant], {
            [styles.noShadow]: noShadow,
            [styles.switchToListOnMobile]: switchToListOnMobile,
          })}
        >
          <Grid2
            container
            flexWrap="nowrap"
            position="relative"
            height="100%"
            width="100%"
            padding={1}
            gap={1}
            className={styles.content}
          >
            <Grid2 className={styles.imageContainer}>
              {!!game.coverImageUrl && (
                <Box
                  sx={{
                    aspectRatio: 1,
                    overflow: 'hidden',
                    borderRadius: '12px',
                  }}
                >
                  <Image
                    src={game.coverImageUrl}
                    alt={game.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={styles.image}
                  />
                </Box>
              )}
              <TypographyV2
                color="brand"
                fontWeight="bold"
                className={styles.gameType}
                letterSpacing={4}
                textAlign="center"
                fontSize="text-l"
              >
                {t(`game_type.${game.type}`).toUpperCase()}
              </TypographyV2>
            </Grid2>
            <Grid2
              flex={1}
              container
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <TypographyV2 fontWeight="medium" textAlign="center">
                {game.title}
              </TypographyV2>
              <Stack gap={1} marginTop={1} width="100%">
                {game.priceHistory?.map((item) => (
                  <DiscountInfo discount={item} withStoreLabel={true} key={item.id} t={t} />
                ))}
              </Stack>
            </Grid2>
          </Grid2>
        </GlassCard>
      </Link>
    </Box>
  )
}

export { GameCard }

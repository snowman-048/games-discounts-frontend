import { Box, Grid2 } from '@mui/material'
import cn from 'classnames'
import Image from 'next/image'

import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'
import { TGame } from '@/types/game.types'
import { TPriceHistory } from '@/types/price-history.types'

import { BuyGameButton } from '../buy-game-button'
import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'
import styles from './styles.module.scss'

type TProps = {
  game: TGame
  t: any
  storeLinks?: Record<EStore, string>
  className?: string
  isFake?: boolean
}

const GameImgWithBuy = ({ game, storeLinks, className, isFake = false, t }: TProps) => {
  return (
    <Grid2
      container
      gap={2}
      flexWrap="nowrap"
      className={cn(styles.container, { [styles.fake]: isFake }, className)}
    >
      <GlassCard className={styles.imgContainer}>
        {!!game.coverImageUrl && (
          <Box sx={{ overflow: 'hidden', borderRadius: '15px' }}>
            <Image src={game.coverImageUrl} alt={game.title} width={0} height={0} sizes="100vw" />
          </Box>
        )}
      </GlassCard>

      <Grid2 container flexDirection="column" gap={2} width="100%">
        <GlassCard className={styles.typeContainer}>
          <TypographyV2 color="brand" fontWeight="bold" fontSize="text-l" letterSpacing={4}>
            {t(`game_type.${game.type}`).toUpperCase()}
          </TypographyV2>
        </GlassCard>
        {game.gameStore
          ?.map((gameStore) => {
            const latestPriceHistory = game.priceHistory?.find(
              (item) => item.storeId === gameStore.store.id,
            )
            const link = storeLinks?.[gameStore.store.name]
            if (!latestPriceHistory || !link) {
              return null
            }
            let additionalPriceHistoryItem: TPriceHistory | undefined
            if (gameStore.store.name === EStore.PSN) {
              additionalPriceHistoryItem = game.priceHistory.find(
                (item) =>
                  item.storeId === gameStore.store.id &&
                  item.meta?.type === EPriceHistoryMetaType.PS_PLUS,
              )
            }
            return (
              <BuyGameButton
                priceHistoryItem={latestPriceHistory}
                link={isFake ? undefined : link}
                additionalPriceHistoryItem={additionalPriceHistoryItem}
                key={gameStore.store.id}
              />
            )
          })
          .filter(Boolean)}
      </Grid2>
    </Grid2>
  )
}

export { GameImgWithBuy }

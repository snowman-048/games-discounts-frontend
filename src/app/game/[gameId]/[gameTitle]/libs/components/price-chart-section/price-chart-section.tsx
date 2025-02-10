'use client'

import { Stack, useMediaQuery } from '@mui/material'

import { PriceInfoItem } from '@/components/price-info-item'
import { PricesChart } from '@/components/prices-chart'
import { TLineConfig } from '@/components/prices-chart/libs/types/line-config.types'
import { TGame, TGameStore } from '@/types/game.types'

type TProps = {
  game: TGame
  height: number
  lines: TLineConfig[]
  gameStore: TGameStore
  storeLink?: string
}

const PriceChartSection = ({ game, height, lines, storeLink, gameStore }: TProps) => {
  const showPriceInfo = useMediaQuery(`(max-width: 1000px)`)
  const showStoreLabel = useMediaQuery(`(min-width: 600px)`)

  return (
    <Stack gap={{ xs: 3, sm: 5 }}>
      {showPriceInfo && (
        <PriceInfoItem
          priceHistory={game.priceHistory}
          store={gameStore.store.name}
          storeLink={storeLink}
          variant="inline"
          showStoreLabel={showStoreLabel}
        />
      )}
      <div style={{ minHeight: height, flex: 1 }}>
        <PricesChart game={game} lines={lines} height={height} />
      </div>
    </Stack>
  )
}

export { PriceChartSection }

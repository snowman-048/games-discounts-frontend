import { useMemo } from 'react'

import { Divider } from '@mui/material'
import cn from 'classnames'

import { EStore } from '@/enums/store.enum'
import { TPriceHistory } from '@/types/price-history.types'

import { StoreIcon } from '../store-icon'
import { GlassCard } from '../ui/cards/glass-card'
import { PriceInfoText } from './libs/components/price-info-text'
import styles from './styles.module.scss'

type TProps = {
  store: EStore
  priceHistory: TPriceHistory[]
  className?: string
  height?: number
}

const PriceInfoItem = ({ store, priceHistory, className, height }: TProps) => {
  const { maxPrice, lowestPrice, region } = useMemo(() => {
    const storePriceHistory = priceHistory.filter((item) => item.store.name === store)

    let maxPrice = storePriceHistory[0]?.initialPrice
    let lowestPrice = storePriceHistory[0]?.discountedPrice

    storePriceHistory.forEach((item) => {
      if (item.initialPrice > maxPrice) {
        maxPrice = item.initialPrice
      }
      if (item.discountedPrice < lowestPrice) {
        lowestPrice = item.discountedPrice
      }
    })
    return { maxPrice, lowestPrice, region: storePriceHistory[0]?.region }
  }, [priceHistory])

  return (
    <GlassCard className={cn(styles.item, className)} style={{ height: height || 'auto' }}>
      <StoreIcon store={store} />

      <Divider sx={{ width: '100%', background: 'var(--bg-light)' }} />
      <PriceInfoText
        label="Lowest price"
        value={`${region.currencySymbol}${lowestPrice}`}
        valueColor="var(--green)"
      />
      <Divider sx={{ width: '100%', background: 'var(--bg-light)' }} />
      <PriceInfoText
        label="Highest price"
        value={`${region.currencySymbol}${maxPrice}`}
        valueColor="var(--red)"
      />
      <Divider sx={{ width: '100%', background: 'var(--bg-light)' }} />
    </GlassCard>
  )
}

export { PriceInfoItem }

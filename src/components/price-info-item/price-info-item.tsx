import { useMemo } from 'react'

import { Divider, Grid2, Typography } from '@mui/material'
import cn from 'classnames'

import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'
import { getStoreColor } from '@/helpers/getStoreColor'
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
  storeLink?: string
}

type TAdditionalLowestInfo = {
  price: number
  label: string
  color?: string
}

const PriceInfoItem = ({ store, priceHistory, className, height, storeLink }: TProps) => {
  const { maxPrice, lowestPrice, region, additionalLowestInfo } = useMemo(() => {
    const storePriceHistory = priceHistory.filter((item) => item.store.name === store)

    let maxPrice = storePriceHistory[0]?.initialPrice
    let lowestPrice = storePriceHistory[0]?.discountedPrice
    let additionalLowestInfo: TAdditionalLowestInfo | null = null

    storePriceHistory.forEach((item) => {
      if (item.initialPrice > maxPrice) {
        maxPrice = item.initialPrice
      }
      if (item.meta?.type === EPriceHistoryMetaType.PS_PLUS) {
        if (!additionalLowestInfo) {
          additionalLowestInfo = {
            price: item.discountedPrice,
            label: 'PS+ lowest',
            color: getStoreColor(EPriceHistoryMetaType.PS_PLUS),
          }
        } else if (additionalLowestInfo.price > item.discountedPrice) {
          additionalLowestInfo.price = item.discountedPrice
        }
        return
      }
      if (item.discountedPrice < lowestPrice) {
        lowestPrice = item.discountedPrice
      }
    })
    return {
      maxPrice,
      lowestPrice,
      region: storePriceHistory[0]?.region,
      additionalLowestInfo: additionalLowestInfo as TAdditionalLowestInfo | null,
    }
  }, [priceHistory])

  if (!region) {
    return <></>
  }

  return (
    <GlassCard className={cn(styles.item, className)} style={{ height: height || 'auto' }}>
      <Grid2 container alignItems="center" gap={2}>
        <StoreIcon store={store} link={storeLink} />
        <Typography>
          {region.country} - {region.key}
        </Typography>
      </Grid2>

      <Divider
        sx={{
          width: '100%',
          background: 'var(--bg-light)',
        }}
      />
      <PriceInfoText
        label="Highest price"
        value={`${region.currencySymbol}${maxPrice}`}
        valueColor="var(--red)"
      />
      <Divider sx={{ width: '100%', background: 'var(--bg-light)' }} />
      <Grid2 container alignItems="center" gap={3}>
        <PriceInfoText
          label="Lowest price"
          value={`${region.currencySymbol}${lowestPrice}`}
          valueColor="var(--green)"
        />
        {additionalLowestInfo && (
          <PriceInfoText
            label={additionalLowestInfo.label}
            value={`${region.currencySymbol}${additionalLowestInfo.price}`}
            valueColor={additionalLowestInfo.color || 'var(--green)'}
          />
        )}
      </Grid2>
      <Divider sx={{ width: '100%', background: 'var(--bg-light)' }} />
    </GlassCard>
  )
}

export { PriceInfoItem }

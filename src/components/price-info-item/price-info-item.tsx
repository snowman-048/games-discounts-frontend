'use client'

import { useMemo } from 'react'

import { Divider, Grid2 } from '@mui/material'
import cn from 'classnames'
import { useTranslations } from 'use-intl'

import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'
import { getStoreColor } from '@/helpers/getStoreColor'
import { TPriceHistory } from '@/types/price-history.types'

import { StoreIcon } from '../store-icon'
import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'
import { PriceInfoText } from './libs/components/price-info-text'
import styles from './styles.module.scss'

type TProps = {
  store: EStore
  priceHistory: TPriceHistory[]
  className?: string
  height?: number | string
  storeLink?: string
  variant?: 'default' | 'inline'
  showStoreLabel?: boolean
  noBlur?: boolean
}

type TAdditionalLowestInfo = {
  price: number
  label: string
  color?: string
}

const PriceInfoItem = ({
  store,
  priceHistory,
  className,
  height,
  storeLink,
  variant = 'default',
  showStoreLabel = true,
  noBlur,
}: TProps) => {
  const t = useTranslations('PriceInfoItem')

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

  const isInline = variant === 'inline'

  const renderDivider = () => (
    <Divider
      flexItem
      sx={{
        background: 'var(--color-l3)',
        mx: 0.5,
      }}
      orientation={isInline ? 'vertical' : 'horizontal'}
    />
  )

  const renderLowestValues = () => (
    <>
      <PriceInfoText
        label={t('lowest_price')}
        value={`${region.currencySymbol}${lowestPrice}`}
        valueColor="var(--color-green)"
      />
      {additionalLowestInfo && (
        <>
          {isInline && renderDivider()}
          <PriceInfoText
            label={additionalLowestInfo.label}
            value={`${region.currencySymbol}${additionalLowestInfo.price}`}
            valueColor={additionalLowestInfo.color || 'var(--color-green)'}
          />
        </>
      )}
    </>
  )

  return (
    <GlassCard
      className={cn(styles.item, styles[variant], className)}
      sx={{ height }}
      noBlur={noBlur}
    >
      <Grid2 container flexDirection={isInline ? 'column' : 'row'} alignItems="center" gap={1}>
        <StoreIcon store={store} link={storeLink} withLabel={showStoreLabel} />
        <TypographyV2 adaptiveFontSize={{ xs: 'text-sm', sm: 'text-l' }} textAlign="center">
          {region.country} - {region.key}
        </TypographyV2>
      </Grid2>

      {renderDivider()}
      <PriceInfoText
        label={t('highest_price')}
        value={`${region.currencySymbol}${maxPrice}`}
        valueColor="var(--color-red)"
      />
      {renderDivider()}
      {isInline ? (
        renderLowestValues()
      ) : (
        <Grid2 container alignItems="center" gap={3}>
          {renderLowestValues()}
        </Grid2>
      )}

      {!isInline && renderDivider()}
    </GlassCard>
  )
}

export { PriceInfoItem }

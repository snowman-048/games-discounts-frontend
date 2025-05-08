'use server'

import { Box, Grid2, Stack } from '@mui/material'
import moment from 'moment'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { DEFAULT_DATE_FORMATTING } from '@/configs/date.config'
import { checkIfDiscountIsActive } from '@/helpers/checkIfDiscountIsActive'
import { getStoreColor } from '@/helpers/getStoreColor'
import { getStoreDisplayName } from '@/helpers/getStoreDisplayName'
import { TPriceHistory } from '@/types/price-history.types'

import { StoreIcon } from '../store-icon'
import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'
import styles from './styles.module.scss'

type TProps = {
  priceHistoryItem: TPriceHistory
  additionalPriceHistoryItem?: TPriceHistory
  link?: string
}

const BuyGameButton = async ({ priceHistoryItem, additionalPriceHistoryItem, link }: TProps) => {
  const t = await getTranslations('BuyGameButton')

  const isMainDiscountActive =
    checkIfDiscountIsActive(priceHistoryItem.discountEnds) &&
    priceHistoryItem.discountedPrice !== priceHistoryItem.initialPrice
  const isAdditionalDiscountActive =
    !!additionalPriceHistoryItem &&
    checkIfDiscountIsActive(additionalPriceHistoryItem.discountEnds) &&
    additionalPriceHistoryItem.discountedPrice !== additionalPriceHistoryItem.initialPrice
  const additionalDiscountLabelColor = isAdditionalDiscountActive
    ? getStoreColor(additionalPriceHistoryItem.meta?.type || additionalPriceHistoryItem.store.name)
    : ''

  const renderContent = () => (
    <Box
      className={styles.container}
      sx={{
        '::before': {
          background: getStoreColor(priceHistoryItem.store.name),
          animationDelay: `${Math.random() * 2}s`,
        },
      }}
    >
      <GlassCard>
        <Grid2
          container
          alignItems="center"
          justifyContent="space-between"
          padding={1}
          width="100%"
        >
          <Grid2 container alignItems="center" gap={1}>
            <StoreIcon store={priceHistoryItem.store.name} withLabel={false} />
            <Stack>
              <TypographyV2 color="inactive">{t('buy_at')}</TypographyV2>
              <TypographyV2 fontWeight="bold">
                {getStoreDisplayName(priceHistoryItem.store.name).full}
              </TypographyV2>
              {isMainDiscountActive && (
                <TypographyV2 color="inactive">
                  {t('discount_ends', {
                    date: moment(priceHistoryItem.discountEnds)
                      .utc(true)
                      .format(DEFAULT_DATE_FORMATTING),
                  })}
                </TypographyV2>
              )}
            </Stack>
          </Grid2>
          <Stack alignItems="flex-end">
            {isMainDiscountActive && (
              <TypographyV2 color="inactive" sx={{ textDecoration: 'line-through' }}>
                {priceHistoryItem.region.currencySymbol}
                {priceHistoryItem.initialPrice}
              </TypographyV2>
            )}
            {isAdditionalDiscountActive && (
              <Grid2 container alignItems="center" gap={1}>
                <TypographyV2 customColor={additionalDiscountLabelColor} fontWeight="bold">
                  {
                    getStoreDisplayName(
                      additionalPriceHistoryItem.meta?.type ||
                        additionalPriceHistoryItem.store.name,
                    ).short
                  }
                </TypographyV2>
                <TypographyV2 customColor={additionalDiscountLabelColor} fontWeight="bold">
                  {additionalPriceHistoryItem.region.currencySymbol}
                  {additionalPriceHistoryItem.discountedPrice}
                </TypographyV2>
              </Grid2>
            )}

            {isMainDiscountActive && (
              <TypographyV2 fontSize="text-l" color="green" fontWeight="bold">
                {priceHistoryItem.region.currencySymbol}
                {priceHistoryItem.discountedPrice}
              </TypographyV2>
            )}

            {!isMainDiscountActive && (
              <TypographyV2 fontSize="text-l">
                {priceHistoryItem.region.currencySymbol}
                {priceHistoryItem.initialPrice}
              </TypographyV2>
            )}
          </Stack>
        </Grid2>
      </GlassCard>
    </Box>
  )

  return link ? (
    <Link href={link} target="_blank">
      {renderContent()}
    </Link>
  ) : (
    renderContent()
  )
}

export { BuyGameButton }

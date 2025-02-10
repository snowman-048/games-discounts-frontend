import { Box, Grid2, Stack, Typography } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'

import { DEFAULT_DATE_FORMATTING } from '@/configs/date.config'
import { checkIfDiscountIsActive } from '@/helpers/checkIfDiscountIsActive'
import { getStoreColor } from '@/helpers/getStoreColor'
import { getStoreDisplayName } from '@/helpers/getStoreDisplayName'
import { TPriceHistory } from '@/types/price-history.types'

import { StoreIcon } from '../store-icon'
import { VolumetricCard } from '../ui/cards/volumetric-card'
import styles from './styles.module.scss'

type TProps = {
  priceHistoryItem: TPriceHistory
  additionalPriceHistoryItem?: TPriceHistory
  link?: string
}

const BuyGameButton = ({ priceHistoryItem, additionalPriceHistoryItem, link }: TProps) => {
  const isMainDiscountActive = checkIfDiscountIsActive(priceHistoryItem.discountEnds)
  const isAdditionalDiscountActive =
    !!additionalPriceHistoryItem && checkIfDiscountIsActive(additionalPriceHistoryItem.discountEnds)
  const additionalDiscountLabelColor = isAdditionalDiscountActive
    ? getStoreColor(additionalPriceHistoryItem.meta?.type || additionalPriceHistoryItem.store.name)
    : ''

  const renderContent = () => (
    <Box>
      <VolumetricCard>
        <Grid2 container alignItems="center" justifyContent="space-between" padding={0.5}>
          <Grid2 container alignItems="center" gap={1}>
            <StoreIcon store={priceHistoryItem.store.name} withLabel={false} />
            <Stack>
              <Typography variant="body2" color="var(--text-secondary)">
                Buy at
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {getStoreDisplayName(priceHistoryItem.store.name).full}
              </Typography>
              {isMainDiscountActive && (
                <Typography variant="body2" color="var(--text-secondary)">
                  Discount ends{' '}
                  {moment(priceHistoryItem.discountEnds).utc(true).format(DEFAULT_DATE_FORMATTING)}
                </Typography>
              )}
            </Stack>
          </Grid2>
          <Stack alignItems="flex-end">
            {isMainDiscountActive && (
              <Typography
                variant="body2"
                color="var(--text-secondary)"
                sx={{ textDecoration: 'line-through' }}
              >
                {priceHistoryItem.region.currencySymbol}
                {priceHistoryItem.initialPrice}
              </Typography>
            )}
            {isAdditionalDiscountActive && (
              <Grid2 container alignItems="center" gap={1}>
                <Typography variant="body2" color={additionalDiscountLabelColor} fontWeight="bold">
                  {
                    getStoreDisplayName(
                      additionalPriceHistoryItem.meta?.type ||
                        additionalPriceHistoryItem.store.name,
                    ).short
                  }
                </Typography>
                <Typography variant="body1" color={additionalDiscountLabelColor} fontWeight="bold">
                  {additionalPriceHistoryItem.region.currencySymbol}
                  {additionalPriceHistoryItem.discountedPrice}
                </Typography>
              </Grid2>
            )}

            {isMainDiscountActive && (
              <Typography variant="body1" color="var(--green)" fontWeight="bold">
                {priceHistoryItem.region.currencySymbol}
                {priceHistoryItem.discountedPrice}
              </Typography>
            )}

            {!isMainDiscountActive && (
              <Typography variant="body1" color="var(--text-primary)">
                {priceHistoryItem.region.currencySymbol}
                {priceHistoryItem.initialPrice}
              </Typography>
            )}
          </Stack>
        </Grid2>
      </VolumetricCard>
    </Box>
  )

  return link ? (
    <Link href={link} target="_blank" className={styles.container}>
      {renderContent()}
    </Link>
  ) : (
    renderContent()
  )
}

export { BuyGameButton }

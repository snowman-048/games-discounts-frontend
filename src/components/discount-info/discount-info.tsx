import { Grid2, Stack } from '@mui/material'
import moment from 'moment'

import { TPriceHistory } from '@/types/price-history.types'

import { StoreIcon } from '../store-icon'
import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'

type TProps = {
  discount: TPriceHistory
  withStoreLabel?: boolean
  t: any
}

const DiscountInfo = ({ discount, withStoreLabel, t }: TProps) => {
  const isDiscountActive = moment(discount.discountEnds).diff(moment(), 'seconds') > 0

  return (
    <GlassCard
      style={{
        borderRadius: 10,
        background: 'rgba(0, 0, 0, 0.3)',
        boxShadow: 'none',
      }}
    >
      <Grid2
        container
        alignItems="center"
        minWidth="100%"
        padding={0.7}
        justifyContent="space-between"
        gap={1}
      >
        <StoreIcon
          store={discount.meta?.type || discount.store.name}
          customLabel={
            isDiscountActive && !!discount.discountPercentage
              ? `-${discount.discountPercentage}%`
              : ''
          }
          withLabel={withStoreLabel}
        />
        <Stack alignItems="flex-end">
          <Grid2 container gap={1} alignItems="center">
            <TypographyV2
              fontSize={isDiscountActive ? 'text-base' : 'text-l'}
              color={isDiscountActive ? 'inactive' : 'primary'}
              sx={{ textDecoration: isDiscountActive ? 'line-through' : 'none' }}
              lineHeight={1.2}
            >
              {discount.region.currencySymbol}
              {discount.initialPrice}
            </TypographyV2>
            {isDiscountActive && (
              <TypographyV2>
                {discount.region.currencySymbol}
                {discount.discountedPrice}
              </TypographyV2>
            )}
          </Grid2>
          {isDiscountActive && (
            <TypographyV2 fontSize="text-s" color="inactive">
              {t('DiscountInfo.ends_in', {
                date: moment
                  .duration(
                    moment(discount.discountEnds).utc(true).endOf('day').valueOf() -
                      moment().utc(true).startOf('day').valueOf(),
                  )
                  .humanize(),
              })}
            </TypographyV2>
          )}
        </Stack>
      </Grid2>
    </GlassCard>
  )
}

export { DiscountInfo }

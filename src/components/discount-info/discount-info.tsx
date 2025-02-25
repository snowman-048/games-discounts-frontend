import { Grid2, Stack, Typography } from '@mui/material'
import moment from 'moment'

import { TPriceHistory } from '@/types/price-history.types'

import { StoreIcon } from '../store-icon'
import { GlassCard } from '../ui/cards/glass-card'

type TProps = {
  discount: TPriceHistory
  withStoreLabel?: boolean
}

const DiscountInfo = ({ discount, withStoreLabel }: TProps) => {
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
          <Grid2 container gap={1}>
            <Typography
              variant={isDiscountActive ? 'body2' : 'body1'}
              color={isDiscountActive ? 'text.secondary' : 'text.primary'}
              sx={{ textDecoration: isDiscountActive ? 'line-through' : 'none' }}
              lineHeight={1.2}
            >
              {discount.region.currencySymbol}
              {discount.initialPrice}
            </Typography>
            {isDiscountActive && (
              <Typography variant="body2" color="text.primary" lineHeight={1.2}>
                {discount.region.currencySymbol}
                {discount.discountedPrice}
              </Typography>
            )}
          </Grid2>
          {isDiscountActive && (
            <Typography variant="caption" lineHeight={1.2} color="text.secondary">
              Ends in{' '}
              {moment
                .duration(
                  moment(discount.discountEnds).utc(true).endOf('day').valueOf() -
                    moment().utc(true).startOf('day').valueOf(),
                )
                .humanize()}
            </Typography>
          )}
        </Stack>
      </Grid2>
    </GlassCard>
  )
}

export { DiscountInfo }

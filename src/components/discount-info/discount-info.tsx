import { Grid2, Stack, Typography } from '@mui/material'
import moment from 'moment'

import { TPriceHistory } from '@/types/price-history.types'

import { StoreIcon } from '../store-icon'
import { GlassCard } from '../ui/cards/glass-card'

type TProps = {
  discount: TPriceHistory
}

const DiscountInfo = ({ discount }: TProps) => {
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
      >
        <StoreIcon
          store={discount.meta?.type || discount.store.name}
          customLabel={`-${discount.discountPercentage}%`}
        />
        <Stack alignItems="flex-end">
          <Grid2 container gap={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              {discount.region.currencySymbol}
              {discount.initialPrice}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {discount.region.currencySymbol}
              {discount.discountedPrice}
            </Typography>
          </Grid2>
          <Typography variant="caption" lineHeight={1.5} color="text.secondary">
            Ends in{' '}
            {moment
              .duration(
                moment(discount.discountEnds).utc(true).endOf('day').valueOf() -
                  moment().utc(true).startOf('day').valueOf(),
              )
              .humanize()}
          </Typography>
        </Stack>
      </Grid2>
    </GlassCard>
  )
}

export { DiscountInfo }

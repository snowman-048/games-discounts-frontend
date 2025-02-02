import { Grid2, Stack, Typography } from '@mui/material'
import moment from 'moment'

import { getStoreColor } from '@/helpers/getStoreColor'
import { TPriceHistory } from '@/types/price-history.types'

import { GlassCard } from '../ui/cards/glass-card'

type TProps = {
  discount: TPriceHistory
}

const DiscountInfo = ({ discount }: TProps) => {
  const storeColor = getStoreColor(discount.meta?.type || discount.store.name)

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
        <Typography
          color="text.primary"
          variant="body2"
          padding={0.3}
          fontWeight="bold"
          sx={{ background: storeColor, borderRadius: 0.8 }}
        >
          -{discount.discountPercentage}%
        </Typography>
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

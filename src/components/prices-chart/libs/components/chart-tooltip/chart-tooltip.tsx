import { Grid2, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import moment from 'moment'

import { StoreIcon } from '@/components/store-icon'
import { DEFAULT_DATE_FORMATTING } from '@/configs/date.config'

import { TPriceChartData } from '../../types/price-chart-data.types'

type TProps = {
  active?: boolean
  payload: { payload: TPriceChartData }[]
}

const ChartTooltip = ({ active, payload }: TProps) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <Stack
      padding={2}
      spacing={1}
      sx={{ background: 'var(--bg-main)', borderRadius: 3, border: '1px solid var(--bg-light)' }}
    >
      {payload.map(({ payload: value }, index) => (
        <Grid2 key={index} gap={2} container alignItems="center">
          <StoreIcon
            store={value.historyItem.meta?.type || value.historyItem.store.name}
            withLabel={false}
          />
          <Stack>
            <Typography variant="body2">
              {moment(value.date).utc(true).format(DEFAULT_DATE_FORMATTING)}
            </Typography>
            <Typography variant="body2">
              {value.region.currencySymbol}
              {value.price}
            </Typography>
          </Stack>
        </Grid2>
      ))}
    </Stack>
  )
}

export { ChartTooltip }

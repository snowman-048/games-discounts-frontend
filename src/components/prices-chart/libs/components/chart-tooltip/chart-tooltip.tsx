import { Grid2 } from '@mui/material'
import { Stack } from '@mui/system'
import moment from 'moment'

import { StoreIcon } from '@/components/store-icon'
import { TypographyV2 } from '@/components/ui/typography'
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
      sx={{ background: 'var(--color-l1)', borderRadius: 3, border: '1px solid var(--color-l3)' }}
    >
      {payload.map(({ payload: value }, index) => (
        <Grid2 key={index} gap={2} container alignItems="center">
          <StoreIcon
            store={value.historyItem.meta?.type || value.historyItem.store.name}
            withLabel={false}
          />
          <Stack>
            <TypographyV2 fontSize="text-l" color="secondary">
              {moment(value.date).utc(true).format(DEFAULT_DATE_FORMATTING)}
            </TypographyV2>
            <TypographyV2 fontSize="text-l" color="secondary">
              {value.region.currencySymbol}
              {value.price}
            </TypographyV2>
          </Stack>
        </Grid2>
      ))}
    </Stack>
  )
}

export { ChartTooltip }

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
  priceAccessor: (index: number) => string
  storeAccessor: (index: number) => string
}

const ChartTooltip = ({ active, payload, priceAccessor, storeAccessor }: TProps) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <Stack
      padding={2}
      spacing={1}
      sx={{ background: 'var(--color-l1)', borderRadius: 3, border: '1px solid var(--color-l3)' }}
    >
      {payload.map(({ payload: value }, index) => {
        const store = value[storeAccessor(index)]
        if (!store) {
          return <></>
        }
        return (
          <Grid2 key={index} gap={2} container alignItems="center">
            <StoreIcon store={store} withLabel={false} />

            <Stack>
              <TypographyV2 fontSize="text-l" color="secondary">
                {moment(value.date).utc(true).format(DEFAULT_DATE_FORMATTING)}
              </TypographyV2>
              <TypographyV2 fontSize="text-l" color="secondary">
                {value.region.currencySymbol}
                {(value as any)[priceAccessor(index)]}
              </TypographyV2>
            </Stack>
          </Grid2>
        )
      })}
    </Stack>
  )
}

export { ChartTooltip }

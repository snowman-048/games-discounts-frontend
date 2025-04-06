import { Grid2 } from '@mui/material'

import { TypographyV2 } from '@/components/ui/typography'

type TProps = {
  label: string
  value: string
  valueColor?: string
}

const PriceInfoText = ({ label, value, valueColor = 'var(--color-primary)' }: TProps) => {
  return (
    <Grid2 container flexDirection="column" alignItems="center" gap={0.5}>
      <TypographyV2 adaptiveFontSize={{ xs: 'text-sm', sm: 'text-l' }} textAlign="center">
        {label}
      </TypographyV2>
      <TypographyV2
        adaptiveFontSize={{ xs: 'text-xl', sm: 'text-2xl' }}
        fontWeight="bold"
        customColor={valueColor}
        component="p"
        textAlign="center"
      >
        {value}
      </TypographyV2>
    </Grid2>
  )
}

export { PriceInfoText }

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
      <TypographyV2 adaptiveFontSize={{ xs: '0.8rem', sm: '1rem' }}>{label}</TypographyV2>
      <TypographyV2
        adaptiveFontSize={{ xs: '1.15rem', sm: '1.5rem' }}
        fontWeight="bold"
        customColor={valueColor}
        component="p"
      >
        {value}
      </TypographyV2>
    </Grid2>
  )
}

export { PriceInfoText }

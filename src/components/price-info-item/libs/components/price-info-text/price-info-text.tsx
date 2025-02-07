import { Grid2, Typography } from '@mui/material'

type TProps = {
  label: string
  value: string
  valueColor?: string
}

const PriceInfoText = ({ label, value, valueColor = 'var(--text-primary)' }: TProps) => {
  return (
    <Grid2 container flexDirection="column" alignItems="center">
      <Typography variant="h6" color="var(--text-primary)">
        {label}
      </Typography>
      <Typography variant="h4" fontWeight="bold" color={valueColor}>
        {value}
      </Typography>
    </Grid2>
  )
}

export { PriceInfoText }

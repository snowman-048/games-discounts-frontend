import { Grid2, Typography } from '@mui/material'

type TProps = {
  label: string
  value: string
  valueColor?: string
}

const PriceInfoText = ({ label, value, valueColor = 'var(--text-primary)' }: TProps) => {
  return (
    <Grid2 container flexDirection="column" alignItems="center">
      <Typography
        variant="body1"
        fontSize={{ xs: '0.8rem', sm: '1rem' }}
        color="var(--text-primary)"
      >
        {label}
      </Typography>
      <Typography
        variant="h5"
        fontSize={{ xs: '1.15rem', sm: '1.5rem' }}
        fontWeight="bold"
        color={valueColor}
        component="p"
      >
        {value}
      </Typography>
    </Grid2>
  )
}

export { PriceInfoText }

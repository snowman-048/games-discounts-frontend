import { Typography } from '@mui/material'

type TProps = {
  label?: string
}

const NoDataLabel = ({ label = 'NO DATA' }: TProps) => {
  return (
    <Typography
      variant="h5"
      fontWeight="bold"
      textAlign="center"
      component="span"
      display="block"
      sx={{ color: 'var(--text-secondary)', width: '100%' }}
    >
      {label}
    </Typography>
  )
}

export { NoDataLabel }

import { Typography } from '@mui/material'

const NoDataLabel = () => {
  return (
    <Typography
      variant="h5"
      fontWeight="bold"
      textAlign="center"
      sx={{ textTransform: 'uppercase', color: 'var(--text-secondary)' }}
    >
      No Data
    </Typography>
  )
}

export { NoDataLabel }

import { Typography } from '@mui/material'

const NoDataLabel = () => {
  return (
    <Typography
      variant="h5"
      fontWeight="bold"
      textAlign="center"
      component="span"
      sx={{ textTransform: 'uppercase', color: 'var(--text-secondary)' }}
    >
      No Data
    </Typography>
  )
}

export { NoDataLabel }

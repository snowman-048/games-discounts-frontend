import { Typography } from '@mui/material'

const NoDataLabel = () => {
  return (
    <Typography
      variant="h5"
      fontWeight="bold"
      textAlign="center"
      component="span"
      display="block"
      sx={{ textTransform: 'uppercase', color: 'var(--text-secondary)', width: '100%' }}
    >
      No Data
    </Typography>
  )
}

export { NoDataLabel }

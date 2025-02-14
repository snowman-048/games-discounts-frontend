import { Box, CircularProgress, LinearProgress } from '@mui/material'

type TProps = {
  variant?: 'circular' | 'linear'
}

const Loader = ({ variant = 'circular' }: TProps) => {
  if (variant === 'linear')
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress sx={{ color: 'var(--accent)' }} />
      </Box>
    )

  return <CircularProgress sx={{ color: 'var(--accent)' }} />
}

export { Loader }

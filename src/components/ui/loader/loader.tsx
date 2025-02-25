import {
  Box,
  CircularProgress,
  CircularProgressProps,
  LinearProgress,
  LinearProgressProps,
} from '@mui/material'

type TProps = Omit<CircularProgressProps | LinearProgressProps, 'variant'> & {
  variant?: 'circular' | 'linear'
  size?: number
}

const Loader = ({ variant = 'circular', ...rest }: TProps) => {
  if (variant === 'linear')
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress sx={{ color: 'var(--accent)' }} {...rest} />
      </Box>
    )

  return <CircularProgress sx={{ color: 'var(--accent)' }} {...rest} />
}

export { Loader }

import { PropsWithChildren } from 'react'

import { Box, BoxProps } from '@mui/material'
import cn from 'classnames'

import styles from './styles.module.scss'

type TProps = PropsWithChildren & BoxProps

const GlassCard = ({ children, className, ...other }: TProps) => {
  return (
    <Box className={cn(styles.card, className)} {...other}>
      {children}
    </Box>
  )
}

export { GlassCard }

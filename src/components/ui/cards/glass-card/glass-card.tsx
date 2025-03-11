import { PropsWithChildren } from 'react'

import { Box, BoxProps } from '@mui/material'
import cn from 'classnames'

import styles from './styles.module.scss'

type TProps = PropsWithChildren &
  BoxProps & {
    asSection?: boolean
  }

const GlassCard = ({ children, className, asSection, padding, ...other }: TProps) => {
  return (
    <Box
      className={cn(styles.card, className)}
      padding={asSection ? { xs: 2, sm: 3 } : padding}
      {...other}
    >
      {children}
    </Box>
  )
}

export { GlassCard }

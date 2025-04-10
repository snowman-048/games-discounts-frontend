import { PropsWithChildren } from 'react'

import { Box, BoxProps } from '@mui/material'
import cn from 'classnames'

import styles from './styles.module.scss'

type TProps = PropsWithChildren &
  BoxProps & {
    asSection?: boolean
    noBlur?: boolean
  }

const GlassCard = ({
  children,
  className,
  asSection,
  padding,
  width,
  noBlur,
  ...other
}: TProps) => {
  return (
    <Box
      className={cn(styles.card, { [styles.noBlur]: noBlur }, className)}
      padding={asSection ? { xs: 2, sm: 3 } : padding}
      width={asSection ? '100%' : width}
      {...other}
    >
      {children}
    </Box>
  )
}

export { GlassCard }

import { PropsWithChildren } from 'react'

import { Grid2, GridBaseProps, SxProps, Theme } from '@mui/material'
import { SystemProps } from '@mui/system'
import cn from 'classnames'

import styles from './styles.module.scss'

type TProps = PropsWithChildren &
  GridBaseProps & {
    sx?: SxProps<Theme>
  } & SystemProps<Theme> & {
    className?: string
  }

const Container = ({ children, className, ...rest }: TProps) => {
  return (
    <Grid2 className={cn(styles.container, className)} {...rest}>
      {children}
    </Grid2>
  )
}

export { Container }

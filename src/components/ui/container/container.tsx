import { PropsWithChildren } from 'react'

import { Grid2, GridBaseProps, SxProps, Theme } from '@mui/material'
import { SystemProps } from '@mui/system'

type TProps = PropsWithChildren &
  GridBaseProps & {
    sx?: SxProps<Theme>
  } & SystemProps<Theme>

const Container = ({ children, ...rest }: TProps) => {
  return (
    <Grid2
      container
      flexDirection="column"
      flex={1}
      minHeight="100%"
      width="100%"
      maxWidth="1200px"
      margin="0 auto"
      {...rest}
    >
      {children}
    </Grid2>
  )
}

export { Container }

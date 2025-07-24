import { PropsWithChildren } from 'react'

import { Grid2, Grid2Props } from '@mui/material'

import styles from './styles.module.scss'

type TProps = Grid2Props & PropsWithChildren

const GameCardsList = ({ children, ...rest }: TProps) => {
  return (
    <Grid2 display="grid" width="100%" className={styles.list} gap={{ xs: 2, md: 2.5 }} {...rest}>
      {children}
    </Grid2>
  )
}

export { GameCardsList }

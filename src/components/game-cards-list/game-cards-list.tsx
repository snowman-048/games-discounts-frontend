import { PropsWithChildren } from 'react'

import { Grid2 } from '@mui/material'

import styles from './styles.module.scss'

const GameCardsList = ({ children }: PropsWithChildren) => {
  return (
    <Grid2 display="grid" width="100%" className={styles.list} gap={{ xs: 2, md: 2.5 }}>
      {children}
    </Grid2>
  )
}

export { GameCardsList }

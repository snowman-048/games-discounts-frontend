import { Typography } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'

import styles from './logo.module.scss'

const Logo = () => {
  return (
    <Link href={`/${EAppRoute.ACTIVE_DISCOUNTS}/1`}>
      <Typography variant="h5" fontWeight="bold" className={styles.link}>
        Games
        {' '}
        <span className={styles.link__top}>Price</span>
        <span className={styles.link__bottom}>Price</span>
        {' '}
        <span style={{ color: 'var(--accent)' }}>Pulse</span>
      </Typography>
    </Link>
  )
}

export { Logo }

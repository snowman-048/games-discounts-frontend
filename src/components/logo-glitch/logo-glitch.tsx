import { Typography } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'

import styles from './logo-glitch.module.scss'

const LogoGlitch = () => {
  return (
    <Link href={`/${EAppRoute.ACTIVE_DISCOUNTS}/1`}>
      <Typography variant="h1" fontWeight="bold" className={styles.text}>
        Games Price Pulse
      </Typography>
    </Link>
  )
}

export { LogoGlitch }

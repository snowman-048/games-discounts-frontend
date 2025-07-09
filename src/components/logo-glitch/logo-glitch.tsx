import { Typography } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'

import styles from './logo-glitch.module.scss'

const LogoGlitch = () => {
  return (
    <Link href={`/${EAppRoute.ACTIVE_DISCOUNTS}/1`} className={styles.container}>
      <img src="/assets/images/logo.png" alt="Game Price Pulse logo" className={styles.logo} />
      <Typography variant="h1" fontWeight="bold" className={styles.text}>
        Game Price Pulse
      </Typography>
    </Link>
  )
}

export { LogoGlitch }

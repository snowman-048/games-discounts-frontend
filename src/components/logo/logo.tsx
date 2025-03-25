import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'

import { TypographyV2 } from '../ui/typography'
import styles from './logo.module.scss'

const Logo = () => {
  return (
    <Link href={`/${EAppRoute.HOME}`}>
      <TypographyV2 fontSize="text-2xl" fontWeight="bold" className={styles.link} component="p">
        Game <span className={styles.link__top}>Price</span>
        <span className={styles.link__bottom}>Price</span>{' '}
        <span style={{ color: 'var(--color-brand)' }}>Pulse</span>
      </TypographyV2>
    </Link>
  )
}

export { Logo }

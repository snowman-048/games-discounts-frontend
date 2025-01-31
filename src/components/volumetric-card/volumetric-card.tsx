import { PropsWithChildren } from 'react'

import styles from './styles.module.scss'

type TProps = PropsWithChildren

const VolumetricCard = ({ children }: TProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>{children}</div>
    </div>
  )
}

export { VolumetricCard }

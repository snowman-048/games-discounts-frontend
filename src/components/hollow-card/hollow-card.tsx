import { PropsWithChildren } from 'react'

import styles from './styles.module.scss'

type TProps = PropsWithChildren

const HollowCard = ({ children }: TProps) => {
  return <div className={styles.card}>{children}</div>
}

export { HollowCard }

import { CSSProperties, PropsWithChildren } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

type TProps = PropsWithChildren & {
  className?: string
  style?: CSSProperties
}

const HollowCard = ({ children, className, style }: TProps) => {
  return (
    <div style={style} className={cn(styles.card, className)}>
      {children}
    </div>
  )
}

export { HollowCard }

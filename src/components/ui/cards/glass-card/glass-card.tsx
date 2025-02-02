import { CSSProperties, MouseEvent, PropsWithChildren } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

type TProps = PropsWithChildren & {
  className?: string
  style?: CSSProperties
  onClick?: (e: MouseEvent) => void
}

const GlassCard = ({ children, className, onClick, style }: TProps) => {
  return (
    <div style={style} className={cn(styles.card, className)} onClick={onClick}>
      {children}
    </div>
  )
}

export { GlassCard }

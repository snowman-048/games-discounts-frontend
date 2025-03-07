import { FC } from 'react'

import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material'
import cn from 'classnames'

import styles from './styles.module.scss'

type TypographyProps = Omit<MuiTypographyProps, 'fontWeight' | 'color' | 'fontSize'> & {
  fontSize?:
    | 'text-s' // 12
    | 'text-sm' // 13
    | 'text-base' // 14
    | 'text-l' // 16
    | 'text-xl' // 20
    | 'text-2xl' // 24
    | 'heading-s' // 28
    | 'heading-m' // 36
    | 'heading-l' // 44
  isUpperCase?: boolean
  fontWeight?:
    | 'normal' // 400
    | 'medium' // 500
    | 'semibold' // 600
    | 'bold' // 700
  color?: // Shades of white/grey
  | 'primary'
    | 'secondary'
    | 'inactive'
    | 'disabled'
    // Bright colors
    | 'red'
    | 'red-hover'
    | 'green'
    // Brand color (might be customizable by user in the future)
    | 'brand'
    // Dark colors
    | 'l1'
    | 'l2'
    | 'l3'
}

const Typography: FC<TypographyProps> = ({
  isUpperCase,
  fontSize = 'text-base',
  fontWeight = 'medium',
  color = 'primary',
  className,
  children,
  sx,
  ...rest
}) => {
  return (
    <MuiTypography
      className={cn(styles.typography, styles[fontSize], styles[fontWeight], className)}
      fontWeight={fontWeight}
      textTransform={isUpperCase ? 'uppercase' : 'none'}
      sx={{
        color: `var(--color-${color})`,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiTypography>
  )
}

export { Typography }
export type { TypographyProps }

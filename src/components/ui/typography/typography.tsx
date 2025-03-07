import { FC } from 'react'

import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material'
import cn from 'classnames'

import styles from './styles.module.scss'

type TFontSize =
  | 'text-s' // 12
  | 'text-sm' // 13
  | 'text-base' // 14
  | 'text-l' // 16
  | 'text-xl' // 20
  | 'text-2xl' // 24
  | 'heading-s' // 28
  | 'heading-m' // 36
  | 'heading-l' // 44

type TFontColor =
  // Shades of white/grey
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

type TypographyProps = Omit<MuiTypographyProps, 'fontWeight' | 'color' | 'fontSize'> & {
  fontSize?: TFontSize
  isUpperCase?: boolean
  fontWeight?:
    | 'normal' // 400
    | 'medium' // 500
    | 'semibold' // 600
    | 'bold' // 700
  color?: TFontColor
  customColor?: string
  adaptiveFontSize?: {
    xl?: string
    lg?: string
    md?: string
    sm?: string
    xs?: string
  }
}

const TypographyV2: FC<TypographyProps> = ({
  isUpperCase,
  fontSize = 'text-base',
  fontWeight = 'normal',
  color = 'primary',
  customColor,
  className,
  children,
  sx,
  adaptiveFontSize,
  ...rest
}) => {
  return (
    <MuiTypography
      className={cn(styles.typography, styles[fontSize], styles[fontWeight], className)}
      fontWeight={fontWeight}
      textTransform={isUpperCase ? 'uppercase' : 'none'}
      sx={{
        color: customColor || `var(--color-${color})`,
        ...sx,
      }}
      fontSize={
        adaptiveFontSize
          ? Object.keys(adaptiveFontSize).reduce(
              (acc, key) => {
                acc[key] = `${(adaptiveFontSize as any)[key]} !important`
                return acc
              },
              {} as Record<string, string>,
            )
          : undefined
      }
      {...rest}
    >
      {children}
    </MuiTypography>
  )
}

export { TypographyV2 }
export type { TypographyProps, TFontColor }

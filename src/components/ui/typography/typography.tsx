import { FC, useMemo } from 'react'

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
    | 'semibold' // 700
    | 'bold' // 900
  color?: TFontColor
  customColor?: string
  adaptiveFontSize?: {
    xl?: TFontSize
    lg?: TFontSize
    md?: TFontSize
    sm?: TFontSize
    xs?: TFontSize
  }
}

const fontSizeMap: Record<TFontSize, number> = {
  'text-s': 0.75,
  'text-sm': 0.81,
  'text-base': 0.88,
  'text-l': 1,
  'text-xl': 1.25,
  'text-2xl': 1.5,
  'heading-s': 1.75,
  'heading-m': 2.25,
  'heading-l': 3,
}

const lineHeightMap: Record<TFontSize, number> = {
  'text-s': 1,
  'text-sm': 1.12,
  'text-base': 1.25,
  'text-l': 1.5,
  'text-xl': 1.75,
  'text-2xl': 2,
  'heading-s': 2.375,
  'heading-m': 2.5,
  'heading-l': 3.5,
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
  const adaptiveValues = useMemo(
    () =>
      adaptiveFontSize
        ? Object.keys(adaptiveFontSize).reduce(
            (acc, key) => {
              acc.adaptiveSize[key] =
                `${fontSizeMap[(adaptiveFontSize as any)[key] as TFontSize]}rem !important`
              acc.adaptiveHeight[key] =
                `${lineHeightMap[(adaptiveFontSize as any)[key] as TFontSize]}rem !important`
              return acc
            },
            { adaptiveSize: {}, adaptiveHeight: {} } as any,
          )
        : null,
    [adaptiveFontSize],
  )

  return (
    <MuiTypography
      className={cn(styles.typography, styles[fontSize], styles[fontWeight], className)}
      textTransform={isUpperCase ? 'uppercase' : 'none'}
      sx={{
        color: customColor || `var(--color-${color})`,
        ...sx,
      }}
      fontSize={adaptiveValues?.adaptiveSize}
      lineHeight={adaptiveValues?.adaptiveHeight}
      {...rest}
    >
      {children}
    </MuiTypography>
  )
}

export { TypographyV2 }
export type { TypographyProps, TFontColor }

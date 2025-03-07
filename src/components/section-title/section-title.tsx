import { ReactNode } from 'react'

import { Divider, DividerProps, SxProps, Theme } from '@mui/material'

import { TypographyV2 } from '../ui/typography'

type TProps = Omit<DividerProps, 'title'> & {
  title: string | ReactNode
  sx?: SxProps<Theme>
}

const SectionTitle = ({ title, sx, ...rest }: TProps) => {
  return (
    <Divider
      sx={{
        '::before': { background: 'var(--color-brand)' },
        '::after': { background: 'var(--color-brand)' },
        width: '100%',
        fontSize: 'inherit',
        ...sx,
      }}
      {...rest}
    >
      <TypographyV2 fontWeight="bold" isUpperCase fontSize="heading-s">
        {title}
      </TypographyV2>
    </Divider>
  )
}

export { SectionTitle }

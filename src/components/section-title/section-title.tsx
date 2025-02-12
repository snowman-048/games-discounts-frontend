import { ReactNode } from 'react'

import { Divider, DividerProps, SxProps, Theme, Typography } from '@mui/material'

type TProps = Omit<DividerProps, 'title'> & {
  title: string | ReactNode
  sx?: SxProps<Theme>
}

const SectionTitle = ({ title, sx, ...rest }: TProps) => {
  return (
    <Divider
      sx={{
        '::before': { background: 'var(--accent)' },
        '::after': { background: 'var(--accent)' },
        width: '100%',
        ...sx,
      }}
      {...rest}
    >
      <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
        {title}
      </Typography>
    </Divider>
  )
}

export { SectionTitle }

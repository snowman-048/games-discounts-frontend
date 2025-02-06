import { Divider, DividerProps, Typography } from '@mui/material'

type TProps = DividerProps & {
  title: string
}

const SectionTitle = ({ title, ...rest }: TProps) => {
  return (
    <Divider
      sx={{
        '::before': { background: 'var(--accent)' },
        '::after': { background: 'var(--accent)' },
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

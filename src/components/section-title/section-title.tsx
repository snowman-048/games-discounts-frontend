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
        width: '100%',
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

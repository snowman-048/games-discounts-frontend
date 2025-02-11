import { ReactNode } from 'react'

import { Divider, Grid2, Typography } from '@mui/material'

type TProps = {
  label: string
  data: string | number | ReactNode
  withDivider?: boolean
}

const InfoItem = ({ label, data, withDivider = true }: TProps) => {
  const isEmpty = Array.isArray(data) ? !data.length : !data
  const isJsx = typeof data === 'object'

  return (
    <Grid2 container flexDirection="column" gap={1}>
      <Grid2 container alignItems="center" gap={1}>
        <Typography>
          <span style={{ color: 'var(--text-secondary)' }}>{label}:</span>{' '}
          {!isJsx && (isEmpty ? '-' : data)}
        </Typography>
        {isJsx && data}
      </Grid2>
      {withDivider && <Divider sx={{ background: 'var(--bg-light)' }} />}
    </Grid2>
  )
}

export { InfoItem }

import { ReactNode } from 'react'

import { Divider, Grid2 } from '@mui/material'

import { TypographyV2 } from '../typography'

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
        <TypographyV2 fontSize="text-l">
          <span style={{ color: 'var(--color-inactive)' }}>{label}:</span>{' '}
          {!isJsx && (isEmpty ? '-' : data)}
        </TypographyV2>
        {isJsx && data}
      </Grid2>
      {withDivider && <Divider sx={{ background: 'var(--color-l3)' }} />}
    </Grid2>
  )
}

export { InfoItem }

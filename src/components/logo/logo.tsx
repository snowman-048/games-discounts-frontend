import { Typography } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'

const Logo = () => {
  return (
    <Link href={`/${EAppRoute.ACTIVE_DISCOUNTS}/1`}>
      <Typography variant="h5" fontWeight="bold">
        Games <span style={{ color: 'var(--accent)' }}>Pulse</span>
      </Typography>
    </Link>
  )
}

export { Logo }

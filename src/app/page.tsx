import { Typography } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'

export default function Home() {
  return (
    <>
      <Typography variant="h1" color="primary">
        Home
      </Typography>
      <Link href={`${EAppRoute.ACTIVE_DISCOUNTS}/1`}>Discounts</Link>
    </>
  )
}

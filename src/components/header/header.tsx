import { Grid2 } from '@mui/material'
import { headers } from 'next/headers'

import { HeaderComponent } from './libs/components/header-component'

const Header = async () => {
  const headerStore = await headers()
  const searchParams = Object.fromEntries(
    new URLSearchParams(headerStore.get('searchParams') || ''),
  )

  return (
    <Grid2
      position="fixed"
      sx={{ top: 0, left: 0, right: 0, zIndex: 5, height: 64, width: '100vw' }}
      component="nav"
    >
      <HeaderComponent query={searchParams} />
    </Grid2>
  )
}

export { Header }

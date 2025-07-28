import InfoIcon from '@mui/icons-material/Info'
import { Box, Button, Stack } from '@mui/material'
import { getTranslations } from 'next-intl/server'
import { headers } from 'next/headers'

import { TypographyV2 } from '../ui/typography'
import { HeaderComponent } from './libs/components/header-component'

const Header = async () => {
  const t = await getTranslations()

  const headerStore = await headers()
  const searchParams = Object.fromEntries(
    new URLSearchParams(headerStore.get('searchParams') || ''),
  )

  return (
    <>
      <Stack
        position="fixed"
        sx={{ top: 0, left: 0, right: 0, zIndex: 5 }}
        gap={1}
        alignItems="flex-end"
      >
        <Box width="100%" height="64px" component="nav">
          <HeaderComponent query={searchParams} />
        </Box>
        <Button sx={{ zIndex: 2, marginRight: 2 }} id="how-it-works" variant="contained">
          <TypographyV2
            position="relative"
            fontWeight="bold"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            color="l1"
          >
            {t('Header.how_it_works')} <InfoIcon />
          </TypographyV2>
        </Button>
      </Stack>
    </>
  )
}

export { Header }

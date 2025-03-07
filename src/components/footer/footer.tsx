import { Box, Divider, Grid2, Stack } from '@mui/material'
import Link from 'next/link'

import { OUR_EMAIL } from '@/configs/contacts.config'
import { EAppRoute } from '@/enums/app-route.enum'

import packageJson from '../../../package.json'
import { Logo } from '../logo'
import { GlassCard } from '../ui/cards/glass-card'
import { Container } from '../ui/container'
import { TypographyV2 } from '../ui/typography'

const Footer = () => {
  return (
    <GlassCard
      style={{
        width: '100%',
        borderRight: 0,
        borderBottom: 0,
        borderLeft: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      <Container flexDirection="column" gap={2} py={2}>
        <Grid2
          gap={2}
          container
          width="100%"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Box sx={{ alignSelf: 'center' }}>
            <Logo />
          </Box>

          <Stack>
            <TypographyV2 color="inactive">Useful Links:</TypographyV2>
            <Link href={`/${EAppRoute.ABOUT_US}`}>
              <TypographyV2>About Us</TypographyV2>
            </Link>
          </Stack>

          <Stack>
            <TypographyV2 color="inactive">Contacts:</TypographyV2>

            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <address>
                <a href={`mailto:${OUR_EMAIL}`}>
                  <TypographyV2>{OUR_EMAIL}</TypographyV2>
                </a>
              </address>
            </Stack>
          </Stack>
        </Grid2>

        <Divider sx={{ background: 'var(--color-l3)' }} flexItem />

        <Grid2 width="100%" container justifyContent="flex-end">
          <TypographyV2 fontWeight="bold" color="disabled">
            Version: {packageJson.version}
          </TypographyV2>
        </Grid2>
      </Container>
    </GlassCard>
  )
}

export { Footer }

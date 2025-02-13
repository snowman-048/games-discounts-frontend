import { Box, Divider, Grid2, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { OUR_EMAIL } from '@/configs/contacts.config'
import { EAppRoute } from '@/enums/app-route.enum'

import packageJson from '../../../package.json'
import { Logo } from '../logo'
import { GlassCard } from '../ui/cards/glass-card'
import { Container } from '../ui/container'

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
            <Typography>
              <span style={{ color: 'var(--text-secondary)' }}>Useful Links:</span>
            </Typography>
            <Link href={`/${EAppRoute.ABOUT_US}`}>About Us</Link>
          </Stack>

          <Stack>
            <Typography>
              <span style={{ color: 'var(--text-secondary)' }}>Contacts:</span>
            </Typography>

            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <address>
                <a href={`mailto:${OUR_EMAIL}`}>
                  <Typography>{OUR_EMAIL}</Typography>
                </a>
              </address>
            </Stack>
          </Stack>
        </Grid2>

        <Divider sx={{ background: 'var(--bg-light)' }} flexItem />

        <Grid2 width="100%" container justifyContent="flex-end">
          <Typography variant="body2" fontWeight="bold" color="var(--text-secondary)">
            Version: {packageJson.version}
          </Typography>
        </Grid2>
      </Container>
    </GlassCard>
  )
}

export { Footer }

import { Divider, Grid2, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import packageJson from '../../../package.json'
import { Logo } from '../logo'
import { GlassCard } from '../ui/cards/glass-card'
import { Container } from '../ui/container'

const Footer = () => {
  return (
    <>
      <Grid2
        container
        width="100%"
        position="relative"
        sx={{ bottom: 0, left: 0, right: 0, zIndex: 5, height: 'auto' }}
      >
        <GlassCard
          style={{
            width: '100%',
            height: '100%',
            paddingTop: 16,
            paddingBottom: 16,

            borderRadius: 0,
            borderTop: '1px solid rgba(150, 150, 150, 0.5)',
            borderRight: '0',
            borderBottom: '0',
            borderLeft: '0',

            justifyContent: 'center',
          }}
        >
          <Container flexDirection="column" gap={2}>
            <Stack spacing={1} width="100%" direction="row" justifyContent="space-between">
              <Stack>
                <Logo />
              </Stack>

              <Stack>
                <Typography>
                  <span style={{ color: 'var(--text-secondary)' }}>Useful Info:</span>
                </Typography>
                <Link href="/about-us">About Us</Link>
              </Stack>

              <Stack>
                <Typography>
                  <span style={{ color: 'var(--text-secondary)' }}>Contacts:</span>
                </Typography>

                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <Typography>co.luminescence@gmail.com</Typography>
                </Stack>
              </Stack>
            </Stack>

            <Divider sx={{ background: 'var(--bg-light)' }} orientation="horizontal" flexItem />

            <Stack spacing={1} width="100%" direction="row" justifyContent="space-between">
              <Typography fontWeight="bold">Version: {packageJson.version}</Typography>
            </Stack>
          </Container>
        </GlassCard>
      </Grid2>
    </>
  )
}

export { Footer }

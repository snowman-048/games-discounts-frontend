import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TelegramIcon from '@mui/icons-material/Telegram'
import { Box, Divider, Grid2, Stack } from '@mui/material'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { OUR_EMAIL } from '@/configs/contacts.config'
import { EAppRoute } from '@/enums/app-route.enum'

import packageJson from '../../../package.json'
import { LanguagesSwitch } from '../languages-switch'
import { Logo } from '../logo'
import { GlassCard } from '../ui/cards/glass-card'
import { Container } from '../ui/container'
import { TypographyV2 } from '../ui/typography'

const socials = [
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/gamepricepulse',
  },
  {
    icon: FacebookIcon,
    href: 'https://www.facebook.com/profile.php?id=61575187432640',
  },
  {
    icon: TelegramIcon,
    href: 'https://t.me/GamePricePulse',
  },
]

const Footer = async () => {
  const t = await getTranslations('Footer')

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
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Box sx={{ alignSelf: 'center' }}>
            <Logo />
          </Box>

          <LanguagesSwitch />

          <Stack gap={1}>
            <TypographyV2 fontWeight="semibold" color="inactive">
              {t('useful_links')}:
            </TypographyV2>
            <Link href={`/${EAppRoute.ABOUT_US}`}>
              <TypographyV2 fontWeight="semibold">{t('about_us')}</TypographyV2>
            </Link>
          </Stack>

          <Stack>
            <TypographyV2 fontWeight="semibold" color="inactive">
              {t('contacts')}:
            </TypographyV2>

            <Stack gap={1}>
              <address>
                <a href={`mailto:${OUR_EMAIL}`}>
                  <TypographyV2>{OUR_EMAIL}</TypographyV2>
                </a>
              </address>

              <Grid2 container alignItems="center" gap={1}>
                {socials.map((item) => (
                  <a href={item.href} key={item.href} target="_blank">
                    <item.icon />
                  </a>
                ))}
              </Grid2>
            </Stack>
          </Stack>
        </Grid2>

        <Divider sx={{ background: 'var(--color-l3)' }} flexItem />

        <Grid2
          width="100%"
          container
          justifyContent="space-between"
          gap={2}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          {/* <Box sx={{ marginLeft: '-58px' }}>
            <div
              className="trustpilot-widget"
              data-locale="en-US"
              data-template-id="56278e9abfbbba0bdcd568bc"
              data-businessunit-id="67e53b7d07f885f02f1f7eca"
              data-style-height="52px"
              data-style-width="300px"
            >
              <a
                href="https://www.trustpilot.com/review/game-price-pulse.com"
                target="_blank"
                rel="noopener"
              >
                Trustpilot
              </a>
            </div>
          </Box> */}
          <TypographyV2 fontWeight="bold" color="disabled">
            {t('version')}: {packageJson.version}
          </TypographyV2>
        </Grid2>
      </Container>
    </GlassCard>
  )
}

export { Footer }

import { SvgIconComponent } from '@mui/icons-material'
import { Box, Divider, Grid2, Stack } from '@mui/material'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import { InfoItem } from '@/components/ui/info-item'

import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'
import styles from './styles.module.scss'

export type THero = {
  coverImageUrl: string
  title: string
  about: string
  links?: TLink[]
}

export type TLink = {
  url: string
  icon: SvgIconComponent
  title: string
}

const HeroCard = ({ hero }: { hero: THero }) => {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <GlassCard className={cn(styles.section, styles.mainInfoContainer)}>
        <Box
          sx={{
            borderRadius: 15,
          }}
        >
          {!!hero.coverImageUrl && (
            <Image
              src={hero.coverImageUrl}
              alt={hero.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ height: 'auto', borderRadius: 15 }}
            />
          )}
        </Box>
        <Stack flex={1} position="relative">
          <TypographyV2 fontSize="heading-m" fontWeight="bold">
            {hero.title}
          </TypographyV2>
          <Divider sx={{ margin: '16px 0', background: 'var(--color-brand)' }} />

          <Stack spacing={1}>
            <InfoItem label="About" data={hero.about} />

            <InfoItem
              label="Links"
              withDivider={false}
              data={hero.links?.map((link) => (
                <Link key={link.url} href={link.url} target="_blank">
                  <Grid2 container alignItems="center" gap={1}>
                    <link.icon width={30} height={30} />
                    <TypographyV2 fontSize="text-l" fontWeight="bold">
                      {link.title}
                    </TypographyV2>
                  </Grid2>
                </Link>
              ))}
            />
          </Stack>
        </Stack>
      </GlassCard>
    </Box>
  )
}

export { HeroCard }

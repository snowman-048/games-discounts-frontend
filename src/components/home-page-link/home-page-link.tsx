import { Box } from '@mui/material'
import Link from 'next/link'

import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'

type TProps = {
  href: string
  title: string
  icon?: any
}

const HomePageLink = ({ href, title, icon: Icon }: TProps) => {
  return (
    <Box width={{ xs: '100%', sm: 'fit-content' }}>
      <Link href={href}>
        <GlassCard px={3} py={2}>
          <TypographyV2
            fontSize="text-2xl"
            fontWeight="bold"
            sx={{
              textTransform: 'uppercase',
              transition: 'color 0.2s ease-out',
              ':hover': { color: 'var(--color-brand)' },
            }}
            gap={1.5}
            display="flex"
            alignItems="center"
            whiteSpace="nowrap"
          >
            {Icon && <Icon />}
            {title}
          </TypographyV2>
        </GlassCard>
      </Link>
    </Box>
  )
}

export { HomePageLink }

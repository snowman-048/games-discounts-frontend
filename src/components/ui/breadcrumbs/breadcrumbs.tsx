import { BoxProps } from '@mui/material'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

import { GlassCard } from '../cards/glass-card'
import { TypographyV2 } from '../typography'

type TProps = BoxProps & {
  breadcrumbs: {
    href: string
    label: string
    highlight?: boolean
    icon?: any
  }[]
}

const Breadcrumbs = ({ breadcrumbs, ...rest }: TProps) => {
  return (
    <GlassCard role="presentation" py={1.5} px={{ xs: 2, md: 2.5 }} {...rest}>
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        sx={{
          overflow: 'hidden',
          ol: {
            overflow: 'hidden',
            flexWrap: 'nowrap',
            alignItems: 'center',
            maxWidth: '100%',
          },
          'li:last-of-type': {
            overflow: 'hidden',
          },
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <Link
              key={breadcrumb.href}
              href={breadcrumb.href}
              underline="none"
              overflow={isLast ? 'hidden' : 'visible'}
              minWidth={isLast ? '0' : 'fit-content'}
              color={breadcrumb.highlight ? 'var(--color-brand)' : 'var(--color-secondary)'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                flexWrap: 'nowrap',
              }}
            >
              {breadcrumb.icon}
              <TypographyV2
                color={breadcrumb.highlight ? 'brand' : 'secondary'}
                fontWeight="medium"
                sx={{
                  ...(isLast
                    ? { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }
                    : { minWidth: 'fit-content' }),
                }}
              >
                {breadcrumb.label}
              </TypographyV2>
            </Link>
          )
        })}
      </MuiBreadcrumbs>
    </GlassCard>
  )
}

export { Breadcrumbs }

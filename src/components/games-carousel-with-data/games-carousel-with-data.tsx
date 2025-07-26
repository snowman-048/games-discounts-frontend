import { ReactNode } from 'react'

import { Grid2, Stack } from '@mui/material'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'
import { createQueryString } from '@/helpers/createQueryString'
import { TGameSearchParams } from '@/types/game-search.types'

import { SectionTitle } from '../section-title'
import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'
import { GamesCarousel } from './libs/components/games-carousel'

type TProps = {
  title: string | ReactNode
  query: TGameSearchParams
}

const GamesCarouselWithData = async ({ title, query }: TProps) => {
  const t = await getTranslations()

  const viewAllLinkParams = JSON.parse(JSON.stringify(query))
  viewAllLinkParams.storeIds = viewAllLinkParams['storeIds[]']
  delete viewAllLinkParams['storeIds[]']

  return (
    <GlassCard style={{ width: '100%' }}>
      <Stack padding={2} width="100%" gap={3}>
        <SectionTitle title={title} />

        <Grid2 mx={-2} marginTop={-2}>
          <GamesCarousel query={query} />
        </Grid2>

        <Link
          href={`/${EAppRoute.ACTIVE_DISCOUNTS}/1${createQueryString(viewAllLinkParams)}`}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <TypographyV2
            fontWeight="bold"
            color="brand"
            letterSpacing={2.5}
            isUpperCase
            fontSize="text-l"
            component="span"
          >
            {t('GamesCarouselWithData.view_more')}
          </TypographyV2>
        </Link>
      </Stack>
    </GlassCard>
  )
}

export { GamesCarouselWithData }

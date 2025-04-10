import { ReactNode } from 'react'

import { Grid2, Stack } from '@mui/material'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { getGamesList } from '@/api/games'
import { EAppRoute } from '@/enums/app-route.enum'
import { createQueryString } from '@/helpers/createQueryString'
import { prepareGamesSearchQuery } from '@/helpers/prepareGamesSearchQuery'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

import { GameCard } from '../game-card'
import { SectionTitle } from '../section-title'
import { GlassCard } from '../ui/cards/glass-card'
import { Carousel } from '../ui/carousel'
import { TypographyV2 } from '../ui/typography'

const ITEMS_COUNT = 10

type TProps = {
  title: string | ReactNode
  query: TGameSearchParams
}

const GamesCarouselWithData = async ({ title, query }: TProps) => {
  const t = await getTranslations()

  let games: TGame[] = []

  try {
    const { data } = await getGamesList(
      prepareGamesSearchQuery({ ...query, page: 1, limit: ITEMS_COUNT }),
    )
    games = data[0]
  } catch (err) {
    console.log('Games fetch error', (err as any).message)
  }

  const viewAllLinkParams = JSON.parse(JSON.stringify(query))
  viewAllLinkParams.storeIds = viewAllLinkParams['storeIds[]']
  delete viewAllLinkParams['storeIds[]']

  return (
    <GlassCard style={{ width: '100%' }}>
      <Stack padding={2} width="100%" gap={3}>
        <SectionTitle title={title} />

        <Grid2 mx={-2} marginTop={-2}>
          <Carousel
            loop
            align="center"
            controlsContainerProps={{ px: 2 }}
            showCounter={false}
            buttonsPosition="sides"
            slides={games.map((game) => (
              <Grid2 width="300px" height="100%" paddingTop={2} key={game.id}>
                <GameCard game={game} t={t} noShadow noBlur />
              </Grid2>
            ))}
          />
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

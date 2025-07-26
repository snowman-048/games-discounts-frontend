import { Stack } from '@mui/material'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { GamesFilters } from '@/components/games-filters'
import { GamesListWithServerFetch } from '@/components/games-list-with-server-fetch'
import { Container } from '@/components/ui/container'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { EPlatform } from '@/enums/platform.enum'
import { EStore } from '@/enums/store.enum'
import { getLocalesMeta } from '@/helpers/getLocalesMeta'
import { TGameSearchParams } from '@/types/game-search.types'

type TProps = {
  params: Promise<{ page: string }>
  searchParams: Promise<TGameSearchParams>
}

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { page } = await params

  return {
    title: 'Explore Video Games',
    keywords: [
      'all video games',
      'complete game list',
      'browse games',
      'game catalog',
      'video game database',
      'game price comparison',
      'find video games',
      'search all games',
      'explore video games',
      'game library',
      'compare game prices',
      'game store list',
      'available video games',
      'full game collection',
      'game platform database',
      ...Object.values(EPlatform),
      ...Object.values(EPlatform).map((platform) => `all ${platform} games`),
      ...Object.values(EPlatform).map((platform) => `${platform} game catalog`),
      ...Object.values(EStore),
      ...Object.values(EStore).map((store) => `all games on ${store}`),
      ...Object.values(EStore).map((store) => `game list on ${store}`),
    ],
    other: {
      robots: 'index, follow',
    },
    icons: {
      other: getLocalesMeta(`${EAppRoute.ALL_GAMES}/${page}`),
    },
  }
}

const AllGames = async ({ params, searchParams }: TProps) => {
  const t = await getTranslations('AllGames')
  const { page } = await params
  const query = await searchParams

  return (
    <Container gap={{ xs: 2, md: 5 }}>
      <Stack gap={2} width="100%">
        <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1">
          {t('title')}
        </TypographyV2>
        <GamesFilters redirectPath={EAppRoute.ALL_GAMES} noDiscountsFilters />
      </Stack>
      {/* <Suspense key={`${page}${JSON.stringify(query)}`} fallback={<GamesListLoader />}> */}
      <GamesListWithServerFetch
        query={query}
        page={+page}
        paginationPath={EAppRoute.ALL_GAMES}
        allGames
      />
      {/* </Suspense> */}
    </Container>
  )
}

export default AllGames

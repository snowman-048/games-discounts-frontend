import { Suspense } from 'react'

import { Stack } from '@mui/material'
import moment from 'moment'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { GamesFilters } from '@/components/games-filters'
import { GamesList } from '@/components/games-list'
import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
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
    title: 'Newest Releases',
    keywords: [
      'new',
      'releases',
      'price',
      'games',
      'video games',
      'search',
      'explore',
      ...Object.values(EStore),
      ...Object.values(EPlatform),
    ],
    icons: {
      other: getLocalesMeta(`${EAppRoute.NEWEST_RELEASES}/${page}`),
    },
  }
}

const NewestReleases = async ({ params, searchParams }: TProps) => {
  const t = await getTranslations('NewestReleases')
  const { page } = await params
  const query = await searchParams

  const queryWithDate = {
    ...query,
    dateFrom: moment().subtract(1, 'months').toISOString(),
    dateTo: moment().add(1, 'days').toISOString(),
  }

  return (
    <Container gap={{ xs: 2, md: 5 }}>
      <Stack gap={2} width="100%">
        <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1">
          {t('title')}
        </TypographyV2>
        <GamesFilters redirectPath={EAppRoute.NEWEST_RELEASES} noDiscountsFilters />
      </Stack>
      <Suspense key={`${page}${JSON.stringify(queryWithDate)}`} fallback={<Loader />}>
        <GamesList
          query={queryWithDate}
          page={+page}
          paginationPath={EAppRoute.NEWEST_RELEASES}
          allGames
        />
      </Suspense>
    </Container>
  )
}

export default NewestReleases

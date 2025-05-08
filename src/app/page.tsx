import { Grid2, Stack } from '@mui/material'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { GamesCarouselWithData } from '@/components/games-carousel-with-data'
import { LogoGlitch } from '@/components/logo-glitch'
import { StoreIcon } from '@/components/store-icon'
import { Container } from '@/components/ui/container'
import { EGameSorting } from '@/enums/game-sorting.enum'
import { EPlatform } from '@/enums/platform.enum'
import { EStore } from '@/enums/store.enum'
import { getLocalesMeta } from '@/helpers/getLocalesMeta'
import { TGameSearchParams } from '@/types/game-search.types'

export const metadata: Metadata = {
  keywords: [
    'games price pulse',
    'discounts',
    'price',
    'low',
    'games',
    'video games',
    'home',
    'lowest',
    'biggest',
    'new',
    'recent',
    'percent',
    ...Object.values(EStore),
    ...Object.values(EPlatform),
  ],
  icons: {
    other: getLocalesMeta(''),
  },
}

const Home = async ({ searchParams }: { searchParams: Promise<TGameSearchParams> }) => {
  const query = await searchParams
  const t = await getTranslations('Home')

  return (
    <>
      <Container paddingBottom={8}>
        <LogoGlitch />

        <Stack width="100%" marginTop={3} gap={{ xs: 2, sm: 5 }}>
          <GamesCarouselWithData
            title={t('biggest_discounts')}
            query={{
              ...query,
              sort: EGameSorting.BIGGEST_DISCOUNTS,
            }}
          />

          <GamesCarouselWithData
            title={
              <Grid2
                container
                alignItems="center"
                flexDirection="row"
                flexWrap="nowrap"
                flex={1}
                gap={1}
                textTransform="none"
              >
                {t.rich('newest_discounts', { store: () => <StoreIcon store={EStore.PSN} /> })}
              </Grid2>
            }
            query={{
              ...query,
              sort: EGameSorting.NEWEST,
              'storeIds[]': ['1'], // Refactor
              onlySelectedStores: true,
            }}
          />

          <GamesCarouselWithData
            title={
              <Grid2
                container
                alignItems="center"
                flexDirection="row"
                flexWrap="nowrap"
                flex={1}
                gap={1}
                textTransform="none"
              >
                {t.rich('newest_discounts', {
                  store: () => <StoreIcon store={EStore.NINTENDO} />,
                })}
              </Grid2>
            }
            query={{
              ...query,
              sort: EGameSorting.NEWEST,
              'storeIds[]': ['2'], // Refactor
              onlySelectedStores: true,
            }}
          />

          <GamesCarouselWithData
            title={
              <Grid2
                container
                alignItems="center"
                flexDirection="row"
                flexWrap="nowrap"
                flex={1}
                gap={1}
                textTransform="none"
              >
                {t.rich('newest_discounts', { store: () => <StoreIcon store={EStore.XBOX} /> })}
              </Grid2>
            }
            query={{
              ...query,
              sort: EGameSorting.NEWEST,
              'storeIds[]': ['3'], // Refactor
              onlySelectedStores: true,
            }}
          />
        </Stack>
      </Container>
    </>
  )
}

export default Home

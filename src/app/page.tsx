import FiberNewIcon from '@mui/icons-material/FiberNew'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import { Grid2, Stack } from '@mui/material'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { AdUnit } from '@/components/ads/ad-unit'
import { ResponsiveAd } from '@/components/ads/responsive-ad'
import { GamesCarouselWithData } from '@/components/games-carousel-with-data'
import { HomePageLink } from '@/components/home-page-link'
import { LogoGlitch } from '@/components/logo-glitch'
import { StoreIcon } from '@/components/store-icon'
import { Container } from '@/components/ui/container'
import { EAppRoute } from '@/enums/app-route.enum'
import { EGameSorting } from '@/enums/game-sorting.enum'
import { EGameType } from '@/enums/game-type.enum'
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
  other: {
    robots: 'index, follow',
  },
  icons: {
    other: getLocalesMeta(''),
  },
}

const commonQuery: TGameSearchParams = {
  types: [EGameType.GAME, EGameType.BUNDLE, EGameType.PREMIUM_EDITION],
}

const Home = async ({ searchParams }: { searchParams: Promise<TGameSearchParams> }) => {
  const query = await searchParams
  const t = await getTranslations()

  return (
    <>
      <Container paddingBottom={8}>
        <LogoGlitch />

        <Stack width="100%" marginTop={3} gap={{ xs: 2, sm: 5 }}>
          <GamesCarouselWithData
            title={t('Home.biggest_discounts')}
            query={{
              ...commonQuery,
              ...query,
              sort: EGameSorting.BIGGEST_DISCOUNTS,
            }}
          />

          <AdUnit
            adFormat="auto"
            adSlot="4334030439"
            data-full-width-responsive="true"
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            frameStyle={{
              width: '100%',
            }}
          />

          {/* <ResponsiveAd /> */}

          <HomePageLink
            href={`/${EAppRoute.ARTICLES}/1`}
            title={t('ProfileControls.articles')}
            icon={NewspaperIcon}
            sx={{
              width: '100%',
            }}
          />

          <Grid2
            container
            alignItems="center"
            justifyContent="center"
            gap={{ xs: 2, md: 5 }}
            flexDirection={{
              xs: 'column',
              md: 'row',
            }}
          >
            <HomePageLink
              href={`/${EAppRoute.HOTTEST_DEALS}/1`}
              title={t('HottestDeals.title')}
              icon={TrendingDownIcon}
            />
            <HomePageLink
              href={`/${EAppRoute.NEWEST_RELEASES}/1`}
              title={t('NewestReleases.title')}
              icon={FiberNewIcon}
            />
          </Grid2>

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
                {t.rich('Home.newest_discounts', { store: () => <StoreIcon store={EStore.PSN} /> })}
              </Grid2>
            }
            query={{
              ...commonQuery,
              ...query,
              sort: EGameSorting.NEWEST,
              'storeIds[]': ['1'], // Refactor
              onlySelectedStores: true,
            }}
          />

          <ResponsiveAd />

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
                {t.rich('Home.newest_discounts', {
                  store: () => <StoreIcon store={EStore.NINTENDO} />,
                })}
              </Grid2>
            }
            query={{
              ...commonQuery,
              ...query,
              sort: EGameSorting.NEWEST,
              'storeIds[]': ['2'], // Refactor
              onlySelectedStores: true,
            }}
          />

          <ResponsiveAd />

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
                {t.rich('Home.newest_discounts', {
                  store: () => <StoreIcon store={EStore.XBOX} />,
                })}
              </Grid2>
            }
            query={{
              ...commonQuery,
              ...query,
              sort: EGameSorting.NEWEST,
              'storeIds[]': ['3'], // Refactor
              onlySelectedStores: true,
            }}
          />

          <ResponsiveAd />
        </Stack>
      </Container>
    </>
  )
}

export default Home

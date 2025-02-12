import { Grid2, Stack } from '@mui/material'

import { GamesCarousel } from '@/components/games-carousel/games-carousel'
import { LogoGlitch } from '@/components/logo-glitch'
import { StoreIcon } from '@/components/store-icon'
import { Container } from '@/components/ui/container'
import { EGameSorting } from '@/enums/game-sorting.enum'
import { EStore } from '@/enums/store.enum'
import { TGameSearchParams } from '@/types/game-search.types'

const Home = async ({ searchParams }: { searchParams: Promise<TGameSearchParams> }) => {
  const query = await searchParams

  return (
    <Container paddingBottom={8}>
      <LogoGlitch />

      <Stack width="100%" marginTop={3} gap={{ xs: 2, sm: 5 }}>
        <GamesCarousel
          title="Biggest Discounts"
          query={{
            ...query,
            sort: EGameSorting.BIGGEST_DISCOUNTS,
          }}
        />

        <GamesCarousel
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
              Newest <StoreIcon store={EStore.PSN} /> Discounts
            </Grid2>
          }
          query={{
            ...query,
            sort: EGameSorting.NEWEST,
            'storeIds[]': ['1'], // Refactor
            onlySelectedStores: true,
          }}
        />

        <GamesCarousel
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
              Newest <StoreIcon store={EStore.NINTENDO} /> Discounts
            </Grid2>
          }
          query={{
            ...query,
            sort: EGameSorting.NEWEST,
            'storeIds[]': ['2'], // Refactor
            onlySelectedStores: true,
          }}
        />

        <GamesCarousel
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
              Newest <StoreIcon store={EStore.XBOX} /> Discounts
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
  )
}

export default Home

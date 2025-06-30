import { cache } from 'react'

import { Divider, Grid2, Stack } from '@mui/material'
import cn from 'classnames'
import moment from 'moment'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { getGameById, getGameFamilyByGameId } from '@/api/games'
import { AddToWishlistButton } from '@/components/add-to-wishlist-button'
import { EditGameButton } from '@/components/edit-game-button'
import { GameCard } from '@/components/game-card'
import { GameImgWithBuy } from '@/components/game-img-with-buy'
import { GameJsonLd } from '@/components/game-json-ld'
import { ImagesCarousel } from '@/components/images-carousel'
import { NoDataLabel } from '@/components/no-data-label'
import { PlatformIcon } from '@/components/platform-icon'
import { PriceInfoItem } from '@/components/price-info-item'
import { TLineConfig } from '@/components/prices-chart/libs/types/line-config.types'
import { SectionTitle } from '@/components/section-title'
import { StoreIcon } from '@/components/store-icon'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Carousel } from '@/components/ui/carousel'
import { Container } from '@/components/ui/container'
import { InfoItem } from '@/components/ui/info-item'
import { TypographyV2 } from '@/components/ui/typography'
import { DEFAULT_DATE_FORMATTING } from '@/configs/date.config'
import { EAppRoute } from '@/enums/app-route.enum'
import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'
import { createGameLinks } from '@/helpers/createGameLinks'
import { getLocalesMeta } from '@/helpers/getLocalesMeta'
import { getStoreColor } from '@/helpers/getStoreColor'
import { getTitleForLink } from '@/helpers/getTitleForLink'
import { makeFirstLetterUpper } from '@/helpers/makeFirstLetterUpper'
import { TFamilyKey } from '@/types/family-key.type'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'
import { TPriceHistory } from '@/types/price-history.types'

import { PriceChartSection } from './libs/components/price-chart-section'
import styles from './styles.module.scss'

type TProps = {
  params: Promise<{ gameId: string; gameTitle: string }>
  searchParams: Promise<TGameSearchParams>
}

const PRICE_ITEM_HEIGHT = 250

const RELATED_ITEMS_CAROUSEL_WIDTH = 1318
const RELATED_ITEMS_GAP = 24
const RELATED_ITEMS_COUNT = 5
const RELATED_ITEM_WIDTH =
  (RELATED_ITEMS_CAROUSEL_WIDTH - RELATED_ITEMS_GAP * (RELATED_ITEMS_COUNT - 1)) /
  RELATED_ITEMS_COUNT

const getGameInfoCached = cache(async (gameId: number, params: TGameSearchParams) => {
  const { data } = await getGameById({ id: +gameId, ...params })
  return data
})

export const generateMetadata = async ({ params, searchParams }: TProps): Promise<Metadata> => {
  const { gameId } = await params
  const query = await searchParams
  const game = await getGameInfoCached(+gameId, query)

  if (!game) {
    return {}
  }

  const metadata: Metadata = {
    title: game.title || '',
    icons: {
      other: getLocalesMeta(`${EAppRoute.GAME}/${gameId}/${getTitleForLink(game.title)}`),
    },
  }

  const keywords = [
    game.title,
    game.type,
    game.publisher,
    ...(game.genres || []),
    ...(game.platforms || []),
    ...(game.gameStore?.map((store) => store.store.name) || []),
    'price',
    'discount',
    'reduced',
    'low',
    'graph',
    'description',
    'publisher',
    'release',
    'stores',
    'platforms',
    'video game',
    'statistic',
    'screenshots',
  ].filter(Boolean) as string[]

  if (keywords.length) {
    metadata.keywords = keywords
  }

  if (game?.coverImageUrl) {
    metadata.openGraph = {
      images: [
        {
          url: game.coverImageUrl,
        },
      ],
    }
  }

  if (game.description) {
    metadata.description = game.description
  }
  return metadata
}

const GameInfo = async ({ params, searchParams }: TProps) => {
  const { gameId } = await params
  const query = await searchParams
  const t = await getTranslations()

  let game: TGame | null = null
  let gameFamily: TFamilyKey[] | null = null
  try {
    const [receivedGame, { data: receivedGameFamily }] = await Promise.all([
      getGameInfoCached(+gameId, query),
      getGameFamilyByGameId({ id: +gameId, ...query }),
    ])

    game = receivedGame
    gameFamily = receivedGameFamily
    game?.priceHistory?.sort(
      (a, b) => moment(b.discountEnds).valueOf() - moment(a.discountEnds).valueOf(),
    )
  } catch (err) {
    console.log('Error getting game', (err as any).message)
    game = null
  }

  if (!game) {
    return <NoDataLabel />
  }

  const storeLinks = createGameLinks(game)

  const gameImages = Object.keys(
    game.images?.reduce(
      (acc, item) => {
        if (!acc[item]) {
          acc[item] = true
        }
        return acc
      },
      {} as Record<string, boolean>,
    ) || {},
  )

  const dicountsExist = game.priceHistory.some((item) => item.discountedPrice !== item.initialPrice)

  return (
    <Container
      gap={{ xs: 3, md: 5 }}
      paddingTop={{ xs: 0, md: 15 }}
      paddingBottom={5}
      className={styles.container}
    >
      <Grid2 sx={{ position: 'relative', width: '100%' }} container flexDirection="column" gap={3}>
        <GameImgWithBuy
          game={game}
          t={t}
          storeLinks={storeLinks}
          className={styles.mainImgWrapper}
        />

        <GlassCard className={cn(styles.section, styles.mainInfoContainer)}>
          {/* This section is needed to reserve the space */}
          <GameImgWithBuy
            game={game}
            t={t}
            storeLinks={storeLinks}
            className={styles.fakeImgWrapper}
            isFake
          />

          <Stack flex={1} position="relative">
            <Stack gap={1} width="100%">
              <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h2">
                {game.title}
              </TypographyV2>

              <Grid2 container alignItems="center" gap={1}>
                <AddToWishlistButton game={game} withText />
                <EditGameButton gameId={+gameId} />
              </Grid2>
            </Stack>
            <Divider sx={{ margin: '16px 0', background: 'var(--color-brand)' }} />

            <Stack gap={1}>
              <InfoItem
                label={t('GameInfo.genres')}
                data={game.genres?.map(makeFirstLetterUpper).join(', ')}
              />
              <InfoItem
                label={t('GameInfo.platforms')}
                data={
                  <Grid2 container gap={2}>
                    {game.platforms?.map((item) => <PlatformIcon platform={item} key={item} />)}
                  </Grid2>
                }
              />
              <InfoItem label={t('GameInfo.publisher')} data={game.publisher} />
              <InfoItem
                label={t('GameInfo.release_date')}
                data={game.releaseDate && moment(game.releaseDate).format(DEFAULT_DATE_FORMATTING)}
              />
              <InfoItem
                label={t('GameInfo.text_languages')}
                data={game.textLanguages?.map(makeFirstLetterUpper).join(', ')}
              />
              <InfoItem
                label={t('GameInfo.voice_languages')}
                data={game.voiceLanguages?.map(makeFirstLetterUpper).join(', ')}
              />
              <InfoItem
                label={t('GameInfo.available_in_stores')}
                withDivider={false}
                data={
                  <Grid2 container gap={2}>
                    {game.gameStore?.map((item) => {
                      const link = storeLinks?.[item.store.name]
                      if (!link) {
                        return <></>
                      }
                      return <StoreIcon key={item.store.name} store={item.store.name} link={link} />
                    })}
                  </Grid2>
                }
              />
            </Stack>
          </Stack>
        </GlassCard>
      </Grid2>

      {dicountsExist && (
        <Grid2
          width="100%"
          container
          alignItems="center"
          justifyContent="space-between"
          flexWrap="nowrap"
        >
          <GlassCard
            className={cn(styles.section, styles.priceSection, styles.priceHistorySection)}
          >
            <SectionTitle title={t('GameInfo.price_history')} />
            {game.gameStore?.map((gameStore) => {
              const storePriceHistory = game.priceHistory.filter(
                (item) => item.storeId === gameStore.store.id,
              )
              if (!storePriceHistory?.length) {
                return <></>
              }
              const lines: TLineConfig[] = []
              if (gameStore.store.name === EStore.PSN) {
                const { commonDiscounts, psPlusDiscounts } = storePriceHistory.reduce(
                  (acc, item) => {
                    if (item.meta?.type === EPriceHistoryMetaType.PS_PLUS) {
                      acc.psPlusDiscounts.push(item)
                    } else {
                      acc.commonDiscounts.push(item)
                    }
                    return acc
                  },
                  {
                    commonDiscounts: [] as TPriceHistory[],
                    psPlusDiscounts: [] as TPriceHistory[],
                  },
                )
                if (psPlusDiscounts.length) {
                  lines.push({
                    priceHistory: psPlusDiscounts,
                    lineColor: getStoreColor(EPriceHistoryMetaType.PS_PLUS),
                  })
                }
                lines.push({ priceHistory: commonDiscounts, lineColor: getStoreColor(EStore.PSN) })
              } else {
                lines.push({
                  lineColor: getStoreColor(gameStore.store.name),
                  priceHistory: storePriceHistory,
                })
              }

              return (
                <PriceChartSection
                  game={game}
                  key={gameStore.store.id}
                  lines={lines}
                  height={PRICE_ITEM_HEIGHT}
                  storeLink={storeLinks?.[gameStore.store.name]}
                  gameStore={gameStore}
                />
              )
            })}
          </GlassCard>

          <Grid2
            flex={1}
            paddingRight={0}
            maxWidth="fit-content"
            width="fit-content"
            className={cn(styles.section, styles.priceSection, styles.priceInfoSection)}
          >
            {game.gameStore?.map((gameStore) => {
              return (
                <PriceInfoItem
                  priceHistory={game.priceHistory}
                  store={gameStore.store.name}
                  height={PRICE_ITEM_HEIGHT}
                  storeLink={storeLinks?.[gameStore.store.name]}
                />
              )
            })}
          </Grid2>
        </Grid2>
      )}

      {!!gameFamily?.length && (
        <GlassCard className={styles.section}>
          <Stack gap={2} width="100%">
            <SectionTitle title={t('GameInfo.related_items')} />

            <Carousel
              align="center"
              slides={gameFamily.map((item) => (
                <Grid2
                  width={`${RELATED_ITEM_WIDTH}px`}
                  height="100%"
                  key={item.game.id}
                  paddingTop={2}
                >
                  <GameCard game={item.game} t={t} noShadow noBlur />
                </Grid2>
              ))}
            />
          </Stack>
        </GlassCard>
      )}

      <GlassCard className={styles.section}>
        <Stack spacing={3} width="100%">
          <Stack gap={2} width="100%">
            <SectionTitle title={t('GameInfo.screenshots')} />
            {!!gameImages.length ? (
              <Grid2 mx={{ xs: -2, sm: -3 }}>
                <ImagesCarousel images={gameImages} alt={game.title} />
              </Grid2>
            ) : (
              <NoDataLabel />
            )}
          </Stack>

          <Stack spacing={2}>
            <SectionTitle title={t('GameInfo.description')} />
            {!!game.description ? (
              <TypographyV2
                fontSize="text-l"
                dangerouslySetInnerHTML={{ __html: game.description }}
              />
            ) : (
              <NoDataLabel />
            )}
          </Stack>
        </Stack>
      </GlassCard>

      <GameJsonLd game={game} storeLinks={storeLinks} />
    </Container>
  )
}

export default GameInfo

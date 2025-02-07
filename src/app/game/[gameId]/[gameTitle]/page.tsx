import { Suspense } from 'react'

import { Box, Divider, Grid2, Stack, Typography } from '@mui/material'
import cn from 'classnames'
import moment from 'moment'
import Image from 'next/image'

import { getGameById } from '@/api/games'
import { NoDataLabel } from '@/components/no-data-label'
import { PlatformIcon } from '@/components/platform-icon'
import { PriceInfoItem } from '@/components/price-info-item'
import { PricesChart } from '@/components/prices-chart'
import { TLineConfig } from '@/components/prices-chart/libs/types/line-config.types'
import { SectionTitle } from '@/components/section-title'
import { StoreIcon } from '@/components/store-icon'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Carousel } from '@/components/ui/carousel'
import { Container } from '@/components/ui/container'
import { InfoItem } from '@/components/ui/info-item'
import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'
import { getStoreColor } from '@/helpers/getStoreColor'
import { makeFirstLetterUpper } from '@/helpers/makeFirstLetterUpper'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'
import { TPriceHistory } from '@/types/price-history.types'

import styles from './styles.module.scss'

type TProps = {
  params: Promise<{ gameId: string; gameTitle: string }>
  searchParams: Promise<TGameSearchParams>
}

const PRICE_ITEM_HEIGHT = 300
const PRICE_ITEM_WIDTH = 800

const GameInfo = async ({ params, searchParams }: TProps) => {
  const { gameId } = await params
  const query = await searchParams

  let game: TGame | null = null
  try {
    const { data } = await getGameById({ id: +gameId, ...query })
    game = data
  } catch (err) {
    console.log('Error getting game', (err as any).message)
  }

  console.log('game', game)

  if (!game) {
    return <NoDataLabel />
  }

  return (
    <Container gap={5} paddingTop={15} paddingBottom={5}>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Stack spacing={2} className={styles.imageWrapper}>
          <GlassCard
            style={{
              width: 'fit-content',
              padding: 16,
              overflow: 'visible',
            }}
          >
            {!!game.coverImageUrl && (
              <Image
                src={game.coverImageUrl}
                alt={game.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '300px', height: 'auto', borderRadius: 15 }}
              />
            )}
          </GlassCard>
          <GlassCard className={styles.typeContainer}>
            <Typography color="accent.main" fontWeight="bold" letterSpacing={4}>
              {game.type.toUpperCase()}
            </Typography>
          </GlassCard>
        </Stack>

        <GlassCard className={cn(styles.section, styles.mainInfoContainer)}>
          {/* This image is needed to reserve the space */}
          <Box sx={{ padding: 2 }}>
            {!!game.coverImageUrl && (
              <Image
                src={game.coverImageUrl}
                alt={game.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: '302px',
                  height: 'auto',
                  borderRadius: 15,
                  opacity: 0,
                  marginBottom: '-70px',
                  transform: 'translateY(-132px)',
                }}
              />
            )}
          </Box>
          <Stack flex={1} position="relative">
            <Typography variant="h4" fontWeight="bold">
              {game.title}
            </Typography>
            <Divider sx={{ margin: '16px 0', background: 'var(--accent)' }} />

            <Stack spacing={1}>
              <InfoItem label="Genres" data={game.genres?.map(makeFirstLetterUpper).join(', ')} />
              <InfoItem
                label="Platforms"
                data={
                  <Grid2 container gap={2}>
                    {game.platforms?.map((item) => <PlatformIcon platform={item} />)}
                  </Grid2>
                }
              />
              <InfoItem
                label="Release date"
                data={game.releaseDate && moment(game.releaseDate).format('DD.MM.YYYY')}
              />
              <InfoItem
                label="Text languages"
                data={game.textLanguages?.map(makeFirstLetterUpper).join(', ')}
              />
              <InfoItem
                label="Voice languages"
                data={game.voiceLanguages?.map(makeFirstLetterUpper).join(', ')}
              />
              <InfoItem
                label="Available in stores"
                data={
                  <Grid2 container gap={2}>
                    {game.gameStore?.map((item) => {
                      const link = game.gameLinks?.find(
                        (gameLink) => gameLink.storeId === item.store.id,
                      )?.url
                      return <StoreIcon store={item.store.name} link={link} />
                    })}
                  </Grid2>
                }
              />
            </Stack>
          </Stack>
        </GlassCard>
      </Box>

      <Grid2
        width="100%"
        container
        alignItems="center"
        justifyContent="space-between"
        flexWrap="nowrap"
      >
        <GlassCard className={cn(styles.section, styles.priceSection)}>
          <SectionTitle title="Price history" />
          {game.gameStore?.map((gameStore) => {
            const storePriceHistory = game.priceHistory.filter(
              (item) => item.storeId === gameStore.store.id,
            )
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
              <div style={{ height: PRICE_ITEM_HEIGHT, width: PRICE_ITEM_WIDTH }}>
                <PricesChart
                  game={game}
                  key={gameStore.store.id}
                  lines={lines}
                  height={PRICE_ITEM_HEIGHT}
                  width={PRICE_ITEM_WIDTH}
                />
              </div>
            )
          })}
        </GlassCard>

        <Grid2 flex={1} className={cn(styles.section, styles.priceSection)}>
          <SectionTitle title="Price info" sx={{ opacity: 0 }} />
          {game.gameStore?.map((gameStore) => {
            return (
              <PriceInfoItem
                priceHistory={game.priceHistory}
                store={gameStore.store.name}
                height={PRICE_ITEM_HEIGHT}
              />
            )
          })}
        </Grid2>
      </Grid2>

      <GlassCard className={styles.section}>
        <Stack spacing={3} width="100%">
          <Stack spacing={2}>
            <SectionTitle title="Screenshots" />
            {!!game.images.length ? (
              <Suspense>
                <Carousel
                  loop
                  align="center"
                  slides={game.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={game.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: 400,
                        borderRadius: 15,
                      }}
                    />
                  ))}
                />
              </Suspense>
            ) : (
              <NoDataLabel />
            )}
          </Stack>

          <Stack spacing={2}>
            <SectionTitle title="Description" />
            <Typography variant="body1">{game.description || <NoDataLabel />}</Typography>
          </Stack>
        </Stack>
      </GlassCard>
    </Container>
  )
}

export default GameInfo

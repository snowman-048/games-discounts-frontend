'use client'

import { useMemo } from 'react'

import { Box, Button, ButtonProps, Divider, Grid2, Stack } from '@mui/material'
import cn from 'classnames'
import moment from 'moment'
import { useTranslations } from 'use-intl'

import { TGameDataMain } from '@/api/pending-connections/types'
import { GameImgWithBuy } from '@/components/game-img-with-buy'
import { NoDataLabel } from '@/components/no-data-label'
import { PlatformIcon } from '@/components/platform-icon'
import { StoreIcon } from '@/components/store-icon'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'
import { InfoItem } from '@/components/ui/info-item'
import { TypographyV2 } from '@/components/ui/typography'
import { DEFAULT_DATE_FORMATTING } from '@/configs/date.config'
import { EStore } from '@/enums/store.enum'
import { makeFirstLetterUpper } from '@/helpers/makeFirstLetterUpper'

import styles from './styles.module.scss'

type TProps = {
  game: TGameDataMain
  actionButton?: ButtonProps & {
    label: string
    onClick?: () => void
  }
  onClick?: () => void
}

const ResolveGameCard = ({ game, actionButton, onClick }: TProps) => {
  const t = useTranslations()

  if (!game) {
    return <NoDataLabel />
  }

  const availablePlatforms = useMemo(
    () =>
      [
        { platform: EStore.PSN, id: game.psnId },
        { platform: EStore.NINTENDO, id: game.nintendoId },
        { platform: EStore.XBOX, id: game.xboxId },
      ].filter((entry) => entry.id),
    [game.psnId, game.nintendoId, game.xboxId],
  )

  return (
    <Container
      gap={{ xs: 3, md: 5 }}
      paddingTop={{ xs: 0, md: 15 }}
      paddingBottom={5}
      className={styles.container}
    >
      <Grid2 sx={{ position: 'relative', width: '100%' }} container flexDirection="column" gap={3}>
        <GameImgWithBuy game={game} t={t} className={styles.mainImgWrapper} />

        <GlassCard className={cn(styles.section, styles.mainInfoContainer)}>
          <Grid2 display={'flex'} justifyContent={'space-between'}>
            <GameImgWithBuy
              game={game}
              t={t}
              className={styles.fakeImgWrapper}
              isFake
              key={game.id}
            />

            <Grid2 className={styles.buttonsContainer}>
              <Button
                sx={{ color: 'var(--color-l1)', textTransform: 'none', gap: 1 }}
                variant="contained"
                type="submit"
                onClick={onClick}
              >
                View Game
              </Button>

              {!!actionButton && (
                <Button
                  sx={{ color: 'var(--color-l1)', textTransform: 'none', gap: 1 }}
                  variant="contained"
                  type="submit"
                  onClick={actionButton.onClick}
                >
                  {actionButton.label}
                </Button>
              )}
            </Grid2>
          </Grid2>

          <Stack flex={1} position="relative" paddingTop={{ xs: 1, md: 2 }}>
            <Stack gap={1} width="100%">
              <TypographyV2
                fontSize="heading-m"
                fontWeight="bold"
                component="h2"
                sx={{ wordBreak: 'break-word' }}
              >
                {game?.title}
              </TypographyV2>
            </Stack>
            <Divider sx={{ margin: '16px 0', background: 'var(--color-brand)' }} />

            <Stack gap={1}>
              <InfoItem
                label="Stores ID"
                data={
                  <Grid2 container gap={3}>
                    {availablePlatforms.map(({ platform, id }) => (
                      <Box display="flex" alignItems="center" gap={1} key={id}>
                        <StoreIcon store={platform} withLabel={false} />
                        <strong>{id}</strong>
                      </Box>
                    ))}
                  </Grid2>
                }
              />

              <InfoItem label="Genres" data={game?.genres?.map(makeFirstLetterUpper).join(', ')} />
              <InfoItem
                label="Platforms"
                data={
                  <Grid2 container gap={2}>
                    {game?.platforms?.map((item) => <PlatformIcon platform={item} key={item} />)}
                  </Grid2>
                }
              />
              <InfoItem label="Publisher" data={game?.publisher} />
              <InfoItem
                label="Release date"
                data={
                  game?.releaseDate && moment(game?.releaseDate).format(DEFAULT_DATE_FORMATTING)
                }
              />
              <InfoItem
                label="Text languages"
                data={game?.textLanguages?.map(makeFirstLetterUpper).join(', ')}
              />
              <InfoItem
                label="Voice languages"
                data={game?.voiceLanguages?.map(makeFirstLetterUpper).join(', ')}
              />
            </Stack>
          </Stack>
        </GlassCard>
      </Grid2>
    </Container>
  )
}

export { ResolveGameCard }

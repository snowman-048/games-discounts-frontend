'use client'

import { useEffect, useState } from 'react'

import { Box, Grid2 } from '@mui/material'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'

import { getGamesList } from '@/api/games'
import { GameCard } from '@/components/game-card'
import { GamesCarouselLoader } from '@/components/games-carousel-loader'
import { NoDataLabel } from '@/components/no-data-label'
import { GAMES_CAROUSEL_SIZE } from '@/configs/games-list.config'
import { prepareGamesSearchQuery } from '@/helpers/prepareGamesSearchQuery'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

const Carousel = dynamic(() => import('@/components/ui/carousel'), { ssr: false })

type TProps = {
  query: TGameSearchParams
}

const GamesCarousel = ({ query }: TProps) => {
  const t = useTranslations()

  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<TGame[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getGamesList(
          prepareGamesSearchQuery({ ...query, page: 1, limit: GAMES_CAROUSEL_SIZE }),
        )
        setGames(data[0])
      } catch (err) {
        console.log('Games fetch error', (err as any).message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (!games.length && !loading) {
    return <NoDataLabel sx={{ marginTop: 2 }} />
  }

  return (
    <Grid2 container sx={{ position: 'relative', width: '100%', height: '401.19px' }}>
      <Box
        sx={{
          position: 'absolute',
          zIndex: loading ? 2 : -1,
          top: 0,
          left: 'calc(50% - 12px)',
          transform: 'translateX(-50%)',
          opacity: loading ? 1 : 0,
        }}
      >
        <GamesCarouselLoader />
      </Box>

      <Box
        sx={{
          opacity: loading ? 0 : 1,
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <Carousel
          loop
          align="center"
          controlsContainerProps={{ px: 2 }}
          showCounter={false}
          buttonsPosition="sides"
          withLoading={false}
          slides={games.map((game) => (
            <Grid2 width="300px" height="100%" paddingTop={2} key={game.id}>
              <GameCard game={game} t={t} noShadow noBlur oneLineTitle onlyBiggestDiscount />
            </Grid2>
          ))}
        />
      </Box>
    </Grid2>
  )
}

export { GamesCarousel }

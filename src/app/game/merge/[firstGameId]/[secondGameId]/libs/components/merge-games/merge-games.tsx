'use client'

import { useEffect, useState } from 'react'

import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Grid2, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'

import { getGameById, mergeGames } from '@/api/games'
import { EditGameForm } from '@/components/edit-game-form/edit-game-form'
import { GameCard } from '@/components/game-card'
import { NoDataLabel } from '@/components/no-data-label'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Loader } from '@/components/ui/loader'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { getTitleForLink } from '@/helpers/getTitleForLink'
import { prepareGamesDataForMerge } from '@/helpers/prepareGamesDataForMerge'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { TGame } from '@/types/game.types'
import { CustomToast } from '@/utils/custom-toast'

type TProps = {
  firstGameId: string
  secondGameId: string
}

const MergeGames = ({ firstGameId, secondGameId }: TProps) => {
  const t = useTranslations()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaveLoading, setIsSaveLoading] = useState(false)
  const [firstGame, setFirstGame] = useState<TGame | null>(null)
  const [secondGame, setSecondGame] = useState<TGame | null>(null)
  const [mergedGameData, setMergedGameData] = useState<
    (TGame & { origin?: TGame; new?: TGame }) | null
  >(null)

  const navigate = useCustomNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const [{ data: fetchedFirstGame }, { data: fetchedSecondGame }] = await Promise.all([
          getGameById({ id: +firstGameId }),
          getGameById({ id: +secondGameId }),
        ])

        setFirstGame(fetchedFirstGame)
        setSecondGame(fetchedSecondGame)

        if (fetchedFirstGame && fetchedSecondGame) {
          const mergedData = prepareGamesDataForMerge([fetchedFirstGame, fetchedSecondGame], true)
          setMergedGameData({ ...mergedData, origin: fetchedFirstGame, new: fetchedSecondGame })
        }
      } catch (err) {
        console.log('Error getting game', (err as any).message)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (!firstGame || !secondGame) {
    return <NoDataLabel />
  }

  const onMerge = async (formattedData: TGame) => {
    try {
      setIsSaveLoading(true)
      const { data } = await mergeGames({ ...formattedData, firstGameId, secondGameId })
      navigate({
        path: `/${EAppRoute.GAME}/${data}/${getTitleForLink(formattedData.title)}`,
        replace: true,
      })
    } catch (err) {
      CustomToast('error', `Error merging games: ${(err as any).message}`)
    } finally {
      setIsSaveLoading(false)
    }
  }

  return (
    <Stack width="100%" gap={3}>
      <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1" textAlign="center">
        Merge Games
      </TypographyV2>

      <Grid2 container gap={3} alignItems="center" justifyContent="center">
        <GameCard game={firstGame} t={t} sx={{ maxWidth: '300px' }} hideControls />
        <SwapHorizIcon />
        <GameCard game={secondGame} t={t} sx={{ maxWidth: '300px' }} hideControls />
      </Grid2>

      {!!mergedGameData && (
        <GlassCard padding={2} width="100%">
          <EditGameForm game={mergedGameData} customSubmit={onMerge} readonly={isSaveLoading} />
        </GlassCard>
      )}
    </Stack>
  )
}

export { MergeGames }

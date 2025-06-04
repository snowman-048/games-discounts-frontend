'use client'

import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { getGameById, updateGame } from '@/api/games'
import { EditGameForm } from '@/components/edit-game-form/edit-game-form'
import { NoDataLabel } from '@/components/no-data-label'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { getGameTitleForLink } from '@/helpers/getGameTitleForLink'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { TGame } from '@/types/game.types'
import { CustomToast } from '@/utils/custom-toast'
import { withRouteProtection } from '@/utils/with-route-protection'

const EditGamePage = () => {
  const { gameId } = useParams<{ gameId: string }>()

  const [game, setGame] = useState<TGame | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const navigate = useCustomNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const receivedGame = await getGameById({ id: +gameId })

        setGame(receivedGame.data)
      } catch (err) {
        console.log('Error getting game', (err as any).message)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const onSubmit = async (data: TGame) => {
    try {
      setIsUpdating(true)
      await updateGame(+gameId, data)
      navigate({
        path: `/${EAppRoute.GAME}/${gameId}/${getGameTitleForLink(data.title)}`,
        replace: true,
      })
    } catch (err) {
      CustomToast('error', (err as Error).message)

      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <Container>
        <Loader variant="linear" />
      </Container>
    )
  }

  if (!game) {
    return (
      <Container>
        <NoDataLabel />
      </Container>
    )
  }

  return (
    <Container paddingBottom={5}>
      <GlassCard padding={2} width="100%">
        <EditGameForm game={game} customSubmit={onSubmit} readonly={isUpdating} />
      </GlassCard>
    </Container>
  )
}

export default withRouteProtection(EditGamePage, [ERole.ADMIN])

'use client'

import { useEffect, useState } from 'react'

import { Grid2, LinearProgress } from '@mui/material'
import { useParams } from 'next/navigation'
import { useTranslations } from 'use-intl'

import { getPendingConnections } from '@/api/pending-connections'
import { TPendingConnection } from '@/api/pending-connections/types'
import { GameCard } from '@/components/game-card'
import { GameCardsList } from '@/components/game-cards-list'
import { NoDataLabel } from '@/components/no-data-label'
import { Pagination } from '@/components/pagination'
import { Container } from '@/components/ui/container'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { CustomToast } from '@/utils/custom-toast'
import { withRouteProtection } from '@/utils/with-route-protection'

const LIST_SIZE = 25

const PendingConnections = () => {
  const t = useTranslations()

  const { page } = useParams<{ page: string }>()

  const [totalConnections, setTotalConnections] = useState(0)
  const [pendingConnections, setPendingConnections] = useState<TPendingConnection[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await getPendingConnections({ page: +page, limit: LIST_SIZE })
        const [info, totalCount] = data
        setPendingConnections(info)
        setTotalConnections(totalCount)
      } catch (err) {
        CustomToast('error', `Error loading pending connections: ${(err as any).message}`)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return <LinearProgress />
  }

  if (!pendingConnections) {
    return <NoDataLabel />
  }

  return (
    <Container>
      <Grid2
        container
        flexDirection="column"
        alignItems="center"
        width="100%"
        gap={5}
        paddingBottom={3}
      >
        <GameCardsList>
          {pendingConnections?.map((game) => (
            <GameCard
              game={game.gameData}
              key={game.id}
              switchToListOnMobile
              t={t}
              customHref={`/${EAppRoute.RESOLVE_PENDING_CONNECTION}/${game.id}`}
              hideControls
            />
          ))}
        </GameCardsList>

        <Pagination
          count={Math.ceil(totalConnections / LIST_SIZE)}
          page={+page}
          path={EAppRoute.PENDING_CONNECTIONS}
        />
      </Grid2>
    </Container>
  )
}

export default withRouteProtection(PendingConnections, [ERole.ADMIN])

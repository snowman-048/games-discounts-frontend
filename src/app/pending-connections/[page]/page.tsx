'use client'

import { useEffect, useState } from 'react'

import { Grid2 } from '@mui/material'
import { useParams } from 'next/navigation'

import { getPendingConnections } from '@/api/pending-connections'
import { TPendingConnection } from '@/api/pending-connections/types'
import { GameCard } from '@/components/game-card'
import { GameCardsList } from '@/components/game-cards-list'
import { Pagination } from '@/components/pagination'
import { Container } from '@/components/ui/container'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { CustomToast } from '@/utils/custom-toast'
import { withRouteProtection } from '@/utils/with-route-protection'

const LIST_SIZE = 25

const PendingConnections = () => {
  const { page } = useParams<{ page: string }>()

  const [totalConnections, setTotalConnections] = useState(0)
  const [pendingConnections, setPendingConnections] = useState<TPendingConnection[] | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getPendingConnections({ page: +page, limit: LIST_SIZE })
        const [info, totalCount] = data
        setPendingConnections(info)
        setTotalConnections(totalCount)
      } catch (err) {
        CustomToast('error', `Error loading pending connections: ${(err as any).message}`)
      }
    })()
  }, [])

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
            <GameCard game={game} key={game.id} switchToListOnMobile />
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

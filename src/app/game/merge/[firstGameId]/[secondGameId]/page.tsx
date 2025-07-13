'use client'

import { useParams } from 'next/navigation'

import { NoDataLabel } from '@/components/no-data-label'
import { Container } from '@/components/ui/container'
import { ERole } from '@/enums/roles.enum'
import { withRouteProtection } from '@/utils/with-route-protection'

import { MergeGames } from './libs/components/merge-games'

const MergeGamePage = () => {
  const { firstGameId, secondGameId } = useParams<{ firstGameId: string; secondGameId: string }>()

  if (firstGameId === secondGameId) {
    return <NoDataLabel label="Ids are the same" />
  }

  return (
    <Container paddingBottom={5}>
      <MergeGames firstGameId={firstGameId} secondGameId={secondGameId} />
    </Container>
  )
}

export default withRouteProtection(MergeGamePage, [ERole.ADMIN])

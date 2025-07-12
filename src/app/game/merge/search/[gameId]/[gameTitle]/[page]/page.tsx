'use client'

import { Stack } from '@mui/material'
import { useParams } from 'next/navigation'

import { GamesFilters } from '@/components/games-filters'
import { GamesListWithClientFetch } from '@/components/games-list-with-client-fetch'
import { Container } from '@/components/ui/container'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { useGetAllSearchParams } from '@/hooks/useGetAllSearchParams'
import { withRouteProtection } from '@/utils/with-route-protection'

const SearchGameToMerge = () => {
  const { gameId, page, gameTitle } = useParams<{
    gameId: string
    page: string
    gameTitle: string
  }>()
  const searchParams = useGetAllSearchParams()

  const path = `${EAppRoute.SEARCH_GAME_TO_MERGE}/${gameId}/${gameTitle}`

  return (
    <Container gap={{ xs: 2, md: 5 }}>
      <Stack gap={2} width="100%">
        <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1">
          <TypographyV2 component="span" color="inactive" fontSize="heading-s" fontWeight="bold">
            Merge game
          </TypographyV2>{' '}
          {decodeURIComponent(gameTitle)}
        </TypographyV2>
        <GamesFilters redirectPath={path} noDiscountsFilters />
      </Stack>
      <GamesListWithClientFetch
        query={searchParams}
        page={+page}
        paginationPath={path}
        allGames
        getGameHref={(game) => `/${EAppRoute.MERGE_GAME}/${gameId}/${game.id}`}
      />
    </Container>
  )
}

export default withRouteProtection(SearchGameToMerge, [ERole.ADMIN])

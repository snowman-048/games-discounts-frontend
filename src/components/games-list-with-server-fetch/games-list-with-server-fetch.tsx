import { getTranslations } from 'next-intl/server'

import { getGamesList } from '@/api/games'
import { prepareGamesSearchQuery } from '@/helpers/prepareGamesSearchQuery'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

import { GamesList } from '../games-list/games-list'

const LIST_SIZE = 23

type TProps = {
  page: number
  paginationPath: string
  query: TGameSearchParams
  allGames?: boolean
  bestDiscounts?: boolean
}

const GamesListWithServerFetch = async ({
  page,
  paginationPath,
  query,
  allGames,
  bestDiscounts,
}: TProps) => {
  const t = await getTranslations()

  let games: TGame[] = []
  let totalGames = 0

  try {
    const { data } = await getGamesList(
      prepareGamesSearchQuery({ ...query, page, limit: LIST_SIZE, allGames, bestDiscounts }),
    )

    games = data[0]
    totalGames = data[1]
  } catch (err) {
    console.log('Games fetch error', (err as any).message)
  }

  return (
    <GamesList
      games={games}
      totalGames={totalGames}
      page={page}
      paginationPath={paginationPath}
      t={t}
      listSize={LIST_SIZE}
    />
  )
}

export { GamesListWithServerFetch }

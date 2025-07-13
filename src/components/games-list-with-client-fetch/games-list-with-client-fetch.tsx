'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { getGamesList } from '@/api/games'
import { prepareGamesSearchQuery } from '@/helpers/prepareGamesSearchQuery'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

import { GamesList } from '../games-list/games-list'
import { Loader } from '../ui/loader'

const LIST_SIZE = 25

type TProps = {
  page: number
  paginationPath: string
  query: TGameSearchParams
  allGames?: boolean
  bestDiscounts?: boolean
  getGameHref?: (game: TGame) => string
}

const GamesListWithClientFetch = ({
  page,
  paginationPath,
  query,
  allGames,
  bestDiscounts,
  getGameHref,
}: TProps) => {
  const t = useTranslations()

  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<TGame[]>([])
  const [totalGames, setTotalGames] = useState(0)

  const fetchGames = async () => {
    try {
      setLoading(true)
      const { data } = await getGamesList(
        prepareGamesSearchQuery({ ...query, page, limit: LIST_SIZE, allGames, bestDiscounts }),
      )

      console.log(
        'search',
        prepareGamesSearchQuery({ ...query, page, limit: LIST_SIZE, allGames, bestDiscounts }),
      )

      setGames(data[0])
      setTotalGames(data[1])
    } catch (err) {
      console.log('Games fetch error', (err as any).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [page, query])

  if (loading) {
    return <Loader />
  }

  return (
    <GamesList
      games={games}
      totalGames={totalGames}
      page={page}
      paginationPath={paginationPath}
      t={t}
      getGameHref={getGameHref}
    />
  )
}

export { GamesListWithClientFetch }

import { TGame } from '@/types/game.types'

import { getUniqueValuesFromArrays } from './getUniqueValues'

const prepareGamesDataForMerge = (games: TGame[]) => {
  if (games.length < 2) {
    return null
  }

  console.log('games', games)

  const genres = getUniqueValuesFromArrays(games.map((game) => game.genres))
  const platforms = getUniqueValuesFromArrays(games.map((game) => game.platforms))
  const textLanguages = getUniqueValuesFromArrays(games.map((game) => game.textLanguages))
  const voiceLanguages = getUniqueValuesFromArrays(games.map((game) => game.voiceLanguages))
  const images = getUniqueValuesFromArrays(games.map((game) => game.images))
  const releaseDates = getUniqueValuesFromArrays(games.map((game) => game.releaseDates))

  const mergedPlainData = [
    'description',
    'releaseDate',
    'publisher',
    'coverImageUrl',
    'type',
    'title',
    'psnId',
    'nintendoId',
    'xboxId',
    'familyKey', // For pending connections
  ].reduce((acc, key) => {
    acc[key] =
      games.toReversed().find((game) => game[key as keyof TGame])?.[key as keyof TGame] || null
    return acc
  }, {} as any)

  return {
    ...mergedPlainData,
    genres,
    platforms,
    textLanguages,
    voiceLanguages,
    images,
    releaseDates,
  }
}

export { prepareGamesDataForMerge }

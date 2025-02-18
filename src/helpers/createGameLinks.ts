import { EStore } from '@/enums/store.enum'
import { TGame } from '@/types/game.types'
import { TRegion } from '@/types/region.types'

import { toKebabCase } from './toKebabCase'

const createSonyGameLink = (game: TGame, region: TRegion) => {
  return `https://store.playstation.com/${region.localizedKeys?.[0]?.localizedKey}/product/${game.psnId}`
}

const createNintendoGameLink = (game: TGame, region: TRegion) => {
  return `https://www.nintendo.com/${region.localizedKeys?.[0]?.localizedKey}/Games/Nintendo-Switch-download-software/${toKebabCase(game.title)}-${game.nintendoId}.html`
}

const createXBoxGameLink = (game: TGame, region: TRegion) => {
  return `https://www.xbox.com/${region.localizedKeys?.[0]?.localizedKey || ''}/games/store/${toKebabCase(game.title)}/${game.xboxId}`
}

const MAPPER: Record<EStore, (game: TGame, region: TRegion) => string> = {
  [EStore.PSN]: createSonyGameLink,
  [EStore.NINTENDO]: createNintendoGameLink,
  [EStore.XBOX]: createXBoxGameLink,
}

const createGameLinks = (game: TGame) => {
  const storeLinks = game.gameLinks.reduce(
    (acc, item) => {
      const storeName = game.gameStore?.find((gameStore) => gameStore.store.id === item.storeId)
        ?.store.name
      if (!storeName) {
        return acc
      }
      if (!acc[storeName]) {
        acc[storeName] = item.url
      }
      return acc
    },
    {} as Record<EStore, string>,
  )

  if (game.gameStore && Object.keys(storeLinks).length < game.gameStore.length) {
    for (const priceHistory of game.priceHistory) {
      if (storeLinks[priceHistory.store.name]) {
        continue
      }

      storeLinks[priceHistory.store.name] = MAPPER[priceHistory.store.name](
        game,
        priceHistory.region,
      )

      if (Object.keys(storeLinks).length >= game.gameStore.length) {
        break
      }
    }
  }

  return storeLinks
}

export { createGameLinks }

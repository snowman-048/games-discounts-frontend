import moment from 'moment'
import Script from 'next/script'
import { Offer, VideoGame, WithContext } from 'schema-dts'

import { EStore } from '@/enums/store.enum'
import { capitalize } from '@/helpers/capitalize'
import { checkIfDiscountIsActive } from '@/helpers/checkIfDiscountIsActive'
import { getStoreDisplayName } from '@/helpers/getStoreDisplayName'
import { TGame } from '@/types/game.types'

type TProps = {
  game: TGame
  storeLinks?: Record<EStore, string>
}

const getDateForJsonLd = (date: string) => moment(date).format('YYYY-MM-DD')

const GameJsonLd = ({ game, storeLinks }: TProps) => {
  const jsonLd: WithContext<VideoGame> = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    identifier: `${game.id}`,
  }

  if (game.description) {
    jsonLd.description = game.description
  }
  if (game.genres?.length) {
    jsonLd.genre = game.genres.map((item) => capitalize(item))
  }
  if (game.publisher) {
    jsonLd.publisher = {
      '@type': 'Organization',
      name: game.publisher,
    }
  }
  if (game.platforms?.length) {
    jsonLd.gamePlatform = game.platforms
  }
  if (game.coverImageUrl) {
    jsonLd.image = game.coverImageUrl
  }
  if (game.priceHistory?.length) {
    jsonLd.offers = game.gameStore
      ?.map((gameStore) => {
        const latestPriceHistory = game.priceHistory.find(
          (item) => item.storeId === gameStore.store.id,
        )
        const url = storeLinks?.[gameStore.store.name]
        if (!latestPriceHistory || !url) {
          return null
        }
        const offer: Offer = {
          '@type': 'Offer',
          url,
          priceCurrency: latestPriceHistory.region.currency,
          seller: {
            '@type': 'Organization',
            name: getStoreDisplayName(gameStore.store.name).full,
          },
        }

        if (checkIfDiscountIsActive(latestPriceHistory.discountEnds)) {
          offer.price = latestPriceHistory.discountedPrice
          offer.priceValidUntil = getDateForJsonLd(latestPriceHistory.discountEnds)
        } else {
          offer.price = latestPriceHistory.initialPrice
        }
        return offer
      })
      .filter(Boolean) as Offer[]
  }

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="lazyOnload"
    />
  )
}

export { GameJsonLd }

import { GAMES_AD_CARDS_AMOUNT, GAMES_LIST_SIZE } from '@/configs/games-list.config'

import { GameCardsList } from '../game-cards-list'
import { GameCardSkeleton } from '../skeletons/game-card-skeleton'

const GamesListLoader = () => {
  return (
    <GameCardsList paddingBottom={3}>
      {Array.from({ length: GAMES_LIST_SIZE + GAMES_AD_CARDS_AMOUNT }).map((_, index) => (
        <GameCardSkeleton key={index} switchToListOnMobile />
      ))}
    </GameCardsList>
  )
}

export { GamesListLoader }

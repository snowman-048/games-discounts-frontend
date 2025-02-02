import { TGameSearchParams } from '@/types/game-search.types'

type TProps = {
  params: Promise<{ gameId: string; gameTitle: string }>
  searchParams: Promise<TGameSearchParams>
}

const GameInfo = async ({ params, searchParams }: TProps) => {
  const { gameId } = await params
  const query = await searchParams

  console.log('gameId', gameId)

  return <></>
}

export default GameInfo

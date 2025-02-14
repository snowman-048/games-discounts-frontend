type TStoreStatItem = { id: number; name: string; _count: { gameStore: number } }

type TGeneralStats = {
  gamesByStores: TStoreStatItem[]
  totalGames: number
}

export type { TGeneralStats }

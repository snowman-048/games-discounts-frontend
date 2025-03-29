import { createQueryString } from '@/helpers/createQueryString'
import { TPagination } from '@/types/api.types'
import { TGame } from '@/types/game.types'

import { api } from '..'
import { TPendingConnection, TSensitiveData } from './types'

const BASE_URL = 'games-pending-connections'

const getPendingConnections = async (query: TPagination) =>
  api.get<[TPendingConnection[], number]>(`${BASE_URL}${createQueryString(query)}`)

const getPendingConnectionById = async (id: number) =>
  api.get<TPendingConnection>(`${BASE_URL}/${id}`)

const mergeGameWithPendingConnection = async (
  body: {
    mergedGameData: TGame
    sensitiveData: TSensitiveData[]
  },
  connectionId: number,
  newStoreId: number,
) => api.post<number>(`${BASE_URL}/merge/${connectionId}/${newStoreId}`, body)

const createGameFromPendingConnection = async (
  body: {
    mergedGameData: TGame
    sensitiveData: TSensitiveData[]
  },
  connectionId: number,
  newStoreId: number,
) => api.post<number>(`${BASE_URL}/create-new/${connectionId}/${newStoreId}`, body)

export {
  getPendingConnections,
  getPendingConnectionById,
  mergeGameWithPendingConnection,
  createGameFromPendingConnection,
}

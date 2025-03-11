import { TUserWishlist, TWishlistWithGames } from '@/types/wishlist.types'

import { api } from '..'
import { TUpdateWishlistPayload } from './types'

const BASE_URL = 'wishlist'

const getUserWishlists = () => api.get<TUserWishlist[]>(`${BASE_URL}`)

const getUserWishlistById = (id: number | string) =>
  api.get<TWishlistWithGames>(`${BASE_URL}/${id}`)

const createWishlist = (payload: { name: string; discountNotificationByEmail: boolean }) =>
  api.post<TUserWishlist>(`${BASE_URL}`, payload)

const updateWishlist = (id: number, payload: TUpdateWishlistPayload) =>
  api.put<TWishlistWithGames>(`${BASE_URL}/${id}`, payload)

const addGameToWishlist = (payload: { gameId: number; wishlistId: number; storeIds: number[] }) =>
  api.post<TUserWishlist[]>(`${BASE_URL}/add-game`, payload)

const removeGameFromWishlist = (payload: { gameId: number; wishlistId: number }) =>
  api.post<TUserWishlist[]>(`${BASE_URL}/remove-game`, payload)

export {
  getUserWishlists,
  getUserWishlistById,
  createWishlist,
  updateWishlist,
  addGameToWishlist,
  removeGameFromWishlist,
}

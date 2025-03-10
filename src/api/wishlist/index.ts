import { TWishlist } from '@/types/user.types'

import { api } from '..'

const BASE_URL = 'wishlist'

const getUserWishlists = () => api.get(`${BASE_URL}`)

const createWishlist = (payload: { name: string; discountNotificationByEmail: boolean }) =>
  api.post<TWishlist>(`${BASE_URL}`, payload)

const addGameToWishlist = (payload: { gameId: number; wishlistId: number; storeIds: number[] }) =>
  api.post<TWishlist[]>(`${BASE_URL}/add-game`, payload)

const removeGameFromWishlist = (payload: { gameId: number; wishlistId: number }) =>
  api.post<TWishlist[]>(`${BASE_URL}/remove-game`, payload)

export { getUserWishlists, createWishlist, addGameToWishlist, removeGameFromWishlist }

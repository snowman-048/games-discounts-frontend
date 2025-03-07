import { TWishlist } from '@/types/user.types'

import { api } from '..'

const BASE_URL = 'wishlist'

const getUserWishlists = () => api.get(`${BASE_URL}`)

const createWishlist = (payload: { name: string; discountNotificationByEmail: boolean }) =>
  api.post<TWishlist>(`${BASE_URL}`, payload)

export { getUserWishlists, createWishlist }

import { TUser } from '@/types/user.types'

import { api } from '..'

const BASE_URL = 'account'

const getCurrentUser = () => api.get<TUser>(`${BASE_URL}/me`)

const updatePreferedRegion = (payload: { regionId: number; storeId: number }) =>
  api.put<TUser>(`${BASE_URL}/prefered-region`, payload)

export { getCurrentUser, updatePreferedRegion }

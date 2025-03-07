import { TUser } from '@/types/user.types'

import { api } from '..'

const BASE_URL = 'account'

const getCurrentUser = () => api.get<TUser>(`${BASE_URL}/me`)

export { getCurrentUser }

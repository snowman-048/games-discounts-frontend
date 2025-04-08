import axios from 'axios'

import { getTokens } from '@/helpers/auth-tokens'
import { TAuthTokens } from '@/types/auth.types'
import { TGetGameParams } from '@/types/game-search.types'
import { TUser } from '@/types/user.types'

import { api } from '..'

const BASE_URL = 'auth'

const authWithGoogle = (payload: TGetGameParams & { token: string }) =>
  api.post<{ tokens: TAuthTokens; user: TUser }>(`${BASE_URL}/google`, payload)

const signup = (payload: {
  username: string
  email: string
  password: string
  regions: TGetGameParams
}) => api.post<{ tokens: TAuthTokens; user: TUser }>(`${BASE_URL}/signup`, payload)

const login = (payload: { login: string; password: string }) =>
  api.post<{ tokens: TAuthTokens; user: TUser }>(`${BASE_URL}/login`, payload)

const refreshTokens = async () => {
  const tokens = await getTokens()

  if (!tokens?.refreshToken) {
    throw new Error('No refresh token')
  }

  return axios.get<{ accessToken: string }>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${BASE_URL}/refresh`,
    {
      headers: {
        Authorization: `Bearer ${tokens.refreshToken}`,
      },
    },
  )
}

export { refreshTokens, authWithGoogle, signup, login }

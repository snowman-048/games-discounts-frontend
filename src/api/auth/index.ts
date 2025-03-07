import axios from 'axios'

import { ELocalStorageKey } from '@/enums/local-storage-key.enum'
import { TAuthTokens } from '@/types/auth.types'
import { TUser } from '@/types/user.types'

import { api } from '..'

const BASE_URL = 'auth'

const authWithGoogle = (token: string) =>
  api.post<{ tokens: TAuthTokens; user: TUser }>(`${BASE_URL}/google`, { token })

const refreshTokens = () => {
  const refreshToken = localStorage[ELocalStorageKey.REFRESH_TOKEN]

  if (!refreshToken) {
    throw new Error('No refresh token')
  }

  return axios.get<TAuthTokens>(`${process.env.NEXT_PUBLIC_API_BASE_URL}${BASE_URL}/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
}

export { refreshTokens, authWithGoogle }

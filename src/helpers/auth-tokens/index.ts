import { deleteCookie, getCookie, setCookie } from 'cookies-next'

import { EStorageKey } from '@/enums/storage-key.enum'
import { TAuthTokens } from '@/types/auth.types'

import { getCookieServer } from '../getCookieServer'
import { isClientRequest } from '../isClientRequest'

const setTokens = (tokens: Partial<TAuthTokens>) => {
  if (isClientRequest()) {
    if (tokens.accessToken) localStorage[EStorageKey.ACCESS_TOKEN] = tokens.accessToken
    if (tokens.refreshToken) localStorage[EStorageKey.REFRESH_TOKEN] = tokens.refreshToken
  }
  if (tokens.accessToken) setCookie(EStorageKey.ACCESS_TOKEN, tokens.accessToken)
  if (tokens.refreshToken) setCookie(EStorageKey.REFRESH_TOKEN, tokens.refreshToken)
}

const getTokens = async () => {
  const isClient = isClientRequest()

  const cookieGetter = isClient ? getCookie : getCookieServer

  let accessToken = await cookieGetter(EStorageKey.ACCESS_TOKEN)
  let refreshToken = await cookieGetter(EStorageKey.REFRESH_TOKEN)

  if (!accessToken || !refreshToken) {
    if (!isClient) {
      return null
    }

    accessToken = localStorage[EStorageKey.ACCESS_TOKEN]
    refreshToken = localStorage[EStorageKey.REFRESH_TOKEN]

    if (accessToken && refreshToken) {
      setCookie(EStorageKey.ACCESS_TOKEN, accessToken)
      setCookie(EStorageKey.REFRESH_TOKEN, refreshToken)
    } else {
      return null
    }
  }

  return { accessToken, refreshToken } as TAuthTokens
}

const deleteTokens = () => {
  if (isClientRequest()) {
    localStorage.removeItem(EStorageKey.ACCESS_TOKEN)
    localStorage.removeItem(EStorageKey.REFRESH_TOKEN)
  }
  deleteCookie(EStorageKey.ACCESS_TOKEN)
  deleteCookie(EStorageKey.REFRESH_TOKEN)
}

export { setTokens, getTokens, deleteTokens }

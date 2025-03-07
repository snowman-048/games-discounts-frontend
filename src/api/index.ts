import axios from 'axios'

import { ELocalStorageKey } from '@/enums/local-storage-key.enum'
import { isClientRequest } from '@/helpers/isClientRequest'
import { logout } from '@/helpers/logout'

import { refreshTokens } from './auth'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: '*/*',
  },
})

api.interceptors.request.use(
  async (config) => {
    if (!isClientRequest()) {
      return config
    }

    const token = localStorage[ELocalStorageKey.ACCESS_TOKEN] || ''

    if (!config.headers.Authorization && token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the user is unauthorised
    if (error.response?.status === 401 && isClientRequest()) {
      if (!originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = localStorage[ELocalStorageKey.REFRESH_TOKEN]
        if (!refreshToken) {
          return Promise.reject({ ...error, message: error.message })
        }

        try {
          const { data } = await refreshTokens()
          localStorage[ELocalStorageKey.ACCESS_TOKEN] = data.accessToken
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
          return api(originalRequest)
        } catch (err) {
          logout()
        }
      } else {
        logout()
      }
    }

    return Promise.reject({ ...error, message: error.message })
  },
)

export { api }

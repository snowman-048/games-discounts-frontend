import axios from 'axios'

import { getTokens, setTokens } from '@/helpers/auth-tokens'
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
    const tokens = await getTokens()

    if (!config.headers.Authorization && tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`
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
    if (error.response?.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true
        const tokens = await getTokens()
        if (!tokens?.refreshToken) {
          return Promise.reject({ ...error, message: error.message })
        }

        try {
          const { data } = await refreshTokens()
          setTokens(data)
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

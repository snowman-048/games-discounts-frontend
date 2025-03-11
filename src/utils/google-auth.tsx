'use client'

import { CredentialResponse, GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'

import { Cookies, useCookies } from 'next-client-cookies'

import { authWithGoogle } from '@/api/auth'
import { defaultRegions } from '@/configs/default-regions.config'
import { setTokens } from '@/helpers/auth-tokens'
import { getStoreRegionKey } from '@/helpers/getStoreRegionKey'
import { useUserStore } from '@/store/user.store'

import { CustomToast } from './custom-toast'

const onGoogleLoginError = () => {
  CustomToast('error', 'Error logging in with Google')
  useUserStore.setState({ isUserLoading: false })
}

const onGoogleLogin = async (res: CredentialResponse, cookies: Cookies) => {
  try {
    if (!res.credential) {
      throw new Error('No credential found')
    }

    const regionCookies = defaultRegions.reduce((acc, item) => {
      const key = getStoreRegionKey(item.storeName)
      ;(acc as any)[key] = +(cookies.get(key) || item.defaultRegion)
      return acc
    }, {})

    useUserStore.setState({ isUserLoading: true })
    const { data } = await authWithGoogle({ ...regionCookies, token: res.credential })

    setTokens(data.tokens)

    useUserStore.setState({ isUserLoading: false, user: data.user })
    CustomToast('success', `You have successfully logged in with Google as ${data.user.username}`)
  } catch (err) {
    CustomToast('error', (err as Error).message)
  } finally {
    useUserStore.setState({ isUserLoading: false })
  }
}

const useGoogleOneTap = () => {
  const cookies = useCookies()

  useGoogleOneTapLogin({
    onSuccess: (res) => onGoogleLogin(res, cookies),
    onError: onGoogleLoginError,
  })
}

const GoogleAuthButton = () => {
  const cookies = useCookies()

  return (
    <GoogleLogin
      onSuccess={(res) => onGoogleLogin(res, cookies)}
      onError={onGoogleLoginError}
      logo_alignment="center"
      theme="filled_black"
    />
  )
}

export { useGoogleOneTap, GoogleAuthButton }

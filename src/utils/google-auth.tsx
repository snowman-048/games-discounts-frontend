'use client'

import { CredentialResponse, GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'

import { useCookies } from 'next-client-cookies'

import { authWithGoogle } from '@/api/auth'
import { defaultRegions } from '@/configs/default-regions.config'
import { setTokens } from '@/helpers/auth-tokens'
import { getStoreRegionKey } from '@/helpers/getStoreRegionKey'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useUserStore } from '@/store/user.store'

import { CustomToast } from './custom-toast'

const onGoogleLoginError = () => {
  CustomToast('error', 'Error logging in with Google')
  useUserStore.setState({ isUserLoading: false })
}

const useOnGoogleLogin = () => {
  const cookies = useCookies()
  const navigate = useCustomNavigate()

  return async (res: CredentialResponse) => {
    try {
      if (!res.credential) {
        throw new Error('No credential found')
      }

      const cookieRegions = defaultRegions.reduce((acc, item) => {
        ;(acc as any)[item.queryKey] = +(cookies.get(item.queryKey) || item.defaultRegion)
        return acc
      }, {})

      useUserStore.setState({ isUserLoading: true })
      const { data } = await authWithGoogle({ ...cookieRegions, token: res.credential })

      setTokens(data.tokens)

      const accountRegions = data.user.storeRegionPreferences.reduce((acc, item) => {
        ;(acc as any)[getStoreRegionKey(item.store.name)] = item.regionId
        return acc
      }, {})

      useUserStore.setState({ isUserLoading: false, user: data.user })
      navigate({ query: accountRegions, replace: true })
      CustomToast('success', `You have successfully logged in with Google as ${data.user.username}`)
    } catch (err) {
      CustomToast('error', (err as Error).message)
    } finally {
      useUserStore.setState({ isUserLoading: false })
    }
  }
}

const useGoogleOneTap = () => {
  const onGoogleLogin = useOnGoogleLogin()

  useGoogleOneTapLogin({
    onSuccess: (res) => onGoogleLogin(res),
    onError: onGoogleLoginError,
  })
}

const GoogleAuthButton = ({ onSuccess }: { onSuccess?: () => void }) => {
  const onGoogleLogin = useOnGoogleLogin()

  return (
    <GoogleLogin
      onSuccess={async (res) => {
        await onGoogleLogin(res)
        onSuccess?.()
      }}
      onError={onGoogleLoginError}
      logo_alignment="center"
      theme="filled_black"
    />
  )
}

export { useGoogleOneTap, GoogleAuthButton }

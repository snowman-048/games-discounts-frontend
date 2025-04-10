'use client'

import { CredentialResponse, GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'

import { useTranslations } from 'next-intl'

import { authWithGoogle } from '@/api/auth'
import { useHandleLogin } from '@/hooks/useHandleLogin.hook'
import { useUserStore } from '@/store/user.store'

import { CustomToast } from './custom-toast'

const onGoogleLoginError = () => {
  CustomToast('error', 'Error logging in with Google')
  useUserStore.setState({ isUserLoading: false })
}

const useOnGoogleLogin = () => {
  const t = useTranslations('google_auth')

  const { prepareRegions, handleLogin } = useHandleLogin()

  return async (res: CredentialResponse) => {
    try {
      if (!res.credential) {
        throw new Error('No credentials found')
      }

      const cookieRegions = prepareRegions()

      useUserStore.setState({ isUserLoading: true })
      const { data } = await authWithGoogle({ ...cookieRegions, token: res.credential })
      handleLogin(data)

      CustomToast('success', t('success_message', { username: data.user.username }))
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

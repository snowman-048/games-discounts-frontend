'use client'

import { CredentialResponse, GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'

import { authWithGoogle } from '@/api/auth'
import { ELocalStorageKey } from '@/enums/local-storage-key.enum'
import { useUserStore } from '@/store/user.store'

const onGoogleLoginError = () => {
  console.log('Login Failed')
}

const onGoogleLogin = async (res: CredentialResponse) => {
  try {
    if (!res.credential) {
      throw new Error('No credential found')
    }

    useUserStore.setState({ isUserLoading: true })
    const { data } = await authWithGoogle(res.credential)

    localStorage[ELocalStorageKey.ACCESS_TOKEN] = data.tokens.accessToken
    localStorage[ELocalStorageKey.REFRESH_TOKEN] = data.tokens.refreshToken

    useUserStore.setState({ isUserLoading: false, user: data.user })
  } catch (err) {
    console.log('Error logging in with Google', (err as any).message)
  }
}

const useGoogleOneTap = () => {
  useGoogleOneTapLogin({
    onSuccess: onGoogleLogin,
    onError: onGoogleLoginError,
  })
}

const GoogleAuthButton = () => {
  return (
    <GoogleLogin
      onSuccess={onGoogleLogin}
      onError={onGoogleLoginError}
      // type="icon"
      logo_alignment="center"
      theme="filled_black"
    />
  )
}

export { useGoogleOneTap, GoogleAuthButton }

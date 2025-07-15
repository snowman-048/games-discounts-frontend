import { useCookies } from 'next-client-cookies'

import { defaultRegions } from '@/configs/default-regions.config'
import { setTokens } from '@/helpers/auth-tokens'
import { getStoreRegionKey } from '@/helpers/getStoreRegionKey'
import { useUserStore } from '@/store/user.store'
import { TAuthTokens } from '@/types/auth.types'
import { TUser } from '@/types/user.types'

import { useCustomNavigate } from './useCustomNavigate'

const useHandleLogin = () => {
  const setUser = useUserStore((state) => state.setUser)

  const cookies = useCookies()
  const navigate = useCustomNavigate()

  const prepareRegions = () =>
    defaultRegions.reduce((acc, item) => {
      ;(acc as any)[item.queryKey] = +(cookies.get(item.queryKey) || item.defaultRegion)
      return acc
    }, {})

  const handleLogin = (data: { tokens: TAuthTokens; user: TUser }) => {
    setTokens(data.tokens)

    const accountRegions = data.user.storeRegionPreferences.reduce((acc, item) => {
      ;(acc as any)[getStoreRegionKey(item.store.name)] = item.regionId
      return acc
    }, {})

    setUser(data.user)

    navigate({ query: accountRegions, replace: true })
  }

  return { prepareRegions, handleLogin }
}

export { useHandleLogin }

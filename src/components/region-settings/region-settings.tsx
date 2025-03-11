'use client'

import { useState } from 'react'

import { Grid2 } from '@mui/material'
import { useCookies } from 'next-client-cookies'

import { updatePreferedRegion } from '@/api/account'
import { defaultRegions } from '@/configs/default-regions.config'
import { EStore } from '@/enums/store.enum'
import { getStoreRegionKey } from '@/helpers/getStoreRegionKey'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useAppStore } from '@/store/app.store'
import { useUserStore } from '@/store/user.store'
import { TOption } from '@/types/option.types'
import { TRegionWithStores } from '@/types/region.types'
import { CustomToast } from '@/utils/custom-toast'

import { Loader } from '../ui/loader'
import { Select } from '../ui/select'

type TProps = {
  regions: TRegionWithStores[]
}

const RegionSettings = ({ regions }: TProps) => {
  const isUserLoading = useUserStore((state) => state.isUserLoading)
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const stores = useAppStore((state) => state.stores)

  const [isLoading, setIsLoading] = useState(false)

  const cookies = useCookies()
  const navigate = useCustomNavigate()

  const getRegionForStore = (storeName: EStore) => {
    if (!user) {
      return +(
        cookies.get(getStoreRegionKey(storeName)) ||
        defaultRegions.find((item) => item.storeName === storeName)!.defaultRegion
      )
    }

    return user.storeRegionPreferences.find((item) => item.store.name === storeName)!.regionId
  }

  const changeRegionForStore = async (storeName: EStore, regionId: number) => {
    if (!stores) {
      return
    }

    try {
      setIsLoading(true)
      const regionKey = getStoreRegionKey(storeName)
      cookies.set(regionKey, `${regionId}`)

      const storeId = stores.find((item) => item.name === storeName)!.id

      const { data } = await updatePreferedRegion({ storeId, regionId })
      setUser(data)
      navigate({ query: { [regionKey]: regionId }, replace: true })
    } catch (err) {
      CustomToast('error', `Error changing region for ${storeName}: ${(err as Error).message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const renderCardContent = () => {
    if (isUserLoading || !regions?.length) {
      return <Loader />
    }

    return defaultRegions.map((item) => (
      <Select
        label={`${item.storeName} Region`}
        disabled={isLoading}
        size="small"
        value={getRegionForStore(item.storeName)}
        options={regions.reduce((acc, region) => {
          if (region.regionStores?.find((id) => id.store.name === item.storeName)) {
            acc.push({
              title: `${region.country} - ${region.key} (${region.currency})`,
              value: region.id,
            })
          }
          return acc
        }, [] as TOption<number>[])}
        onChange={(value) => {
          changeRegionForStore(item.storeName, +value)
        }}
      />
    ))
  }

  return (
    <Grid2 container flexDirection="column" alignItems="center" gap={3} width="100%">
      {renderCardContent()}
    </Grid2>
  )
}

export { RegionSettings }

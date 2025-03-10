'use client'

import { useState } from 'react'

import { FormControl, Grid2, InputLabel, MenuItem, Select } from '@mui/material'
import { useCookies } from 'next-client-cookies'

import { updatePreferedRegion } from '@/api/account'
import { defaultRegions } from '@/configs/default-regions.config'
import { EStore } from '@/enums/store.enum'
import { getStoreRegionKey } from '@/helpers/getStoreRegionKey'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useAppStore } from '@/store/app.store'
import { useUserStore } from '@/store/user.store'
import { TRegionWithStores } from '@/types/region.types'
import { CustomToast } from '@/utils/custom-toast'

import { GlassCard } from '../ui/cards/glass-card'
import { Loader } from '../ui/loader'

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
    if (isUserLoading) {
      return <Loader />
    }

    return defaultRegions.map((item) => (
      <FormControl sx={{ width: '100%' }} key={item.storeName}>
        <InputLabel>{item.storeName} Region</InputLabel>
        <Select
          label={`${item.storeName} Region`}
          disabled={isLoading}
          onChange={(e) => {
            const value = e.target.value
            changeRegionForStore(item.storeName, +value)
          }}
          value={getRegionForStore(item.storeName)}
          size="small"
        >
          {regions?.map((region) => {
            if (region.regionStores?.find((id) => id.store.name === item.storeName)) {
              return (
                <MenuItem key={region.id} value={region.id}>
                  {region.country} - {region.key} ({region.currency})
                </MenuItem>
              )
            }
          })}
        </Select>
      </FormControl>
    ))
  }

  return (
    <GlassCard>
      <Grid2
        padding={3}
        container
        flexDirection="column"
        alignItems="center"
        gap={3}
        width={{ xs: '100vw', sm: '400px' }}
      >
        {renderCardContent()}
      </Grid2>
    </GlassCard>
  )
}

export { RegionSettings }

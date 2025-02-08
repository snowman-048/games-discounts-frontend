'use client'

import { FormControl, Grid2, InputLabel, MenuItem, Select } from '@mui/material'
import { useCookies } from 'next-client-cookies'

import { defaultRegions } from '@/configs/default-regions.config'
import { getStoreRegionKey } from '@/helpers/getStoreRegionKey'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { TRegionWithStores } from '@/types/region.types'

import { GlassCard } from '../ui/cards/glass-card'

type TProps = {
  regions: TRegionWithStores[]
}

const RegionSettings = ({ regions }: TProps) => {
  const cookies = useCookies()
  const navigate = useCustomNavigate()

  return (
    <GlassCard>
      <Grid2 padding={3} container flexDirection="column" alignItems="center" gap={3}>
        {defaultRegions.map((item) => (
          <FormControl sx={{ width: 300 }} key={item.storeName}>
            <InputLabel>{item.storeName} Region</InputLabel>
            <Select
              label={`${item.storeName} Region`}
              onChange={(e) => {
                const value = e.target.value
                const key = getStoreRegionKey(item.storeName)
                cookies.set(key, `${value}`)
                navigate({ query: { [key]: value }, replace: true })
              }}
              value={cookies.get(getStoreRegionKey(item.storeName)) || item.defaultRegion}
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
        ))}
      </Grid2>
    </GlassCard>
  )
}

export { RegionSettings }

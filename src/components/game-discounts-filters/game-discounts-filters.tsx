'use client'

import { useEffect, useState } from 'react'

import { FormControl, Grid2, InputLabel, MenuItem, Select } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

import { getStores } from '@/api/stores'
import { EGameSorting } from '@/enums/game-sorting.enum'
import { createQueryString } from '@/helpers/createQueryString'
import { useGetAllSearchParams } from '@/hooks/useGetAllSearchParams'
import { TOption } from '@/types/option.types'
import { TStore } from '@/types/store.types'

import { GlassCard } from '../ui/cards/glass-card'
import { MultipleAutocomplete } from '../ui/multiple-autocomplete'

const sortingOptions: TOption[] = [
  {
    title: 'Newest discounts',
    value: EGameSorting.NEWEST,
  },
  {
    title: 'Finishing discounts',
    value: EGameSorting.FINISHING,
  },
]

const GameDiscountsFilters = () => {
  const [stores, setStores] = useState<TStore[]>([])

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useGetAllSearchParams()

  const sort = searchParams.sort || sortingOptions[0].value
  const storeIds = searchParams.storeIds || []

  // TODO: Move to Redux
  useEffect(() => {
    ;(async () => {
      const { data } = await getStores()
      setStores(data)
    })()
  }, [])

  const onChange = (newValue: Record<string, any>) => {
    router.replace(`${pathname}${createQueryString({ ...searchParams, ...newValue })}`)
  }

  return (
    <Grid2 container width="100%">
      <GlassCard style={{ width: '100%' }}>
        <Grid2 padding={3} flex={1} container flexWrap="nowrap" gap={2} alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              label="Sort by"
              onChange={(e) => {
                const value = e.target.value
                onChange({ sort: value })
              }}
              size="small"
              value={sort}
            >
              {sortingOptions.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <MultipleAutocomplete
            label="Store"
            options={stores.map((store) => ({
              title: store.name,
              value: `${store.id}`,
            }))}
            onChange={(value) => {
              onChange({ storeIds: value })
            }}
            size="small"
            fullWidth
            value={storeIds as string[]}
            disabled={!stores.length}
          />
        </Grid2>
      </GlassCard>
    </Grid2>
  )
}

export { GameDiscountsFilters }

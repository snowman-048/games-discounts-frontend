'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

import { getStores } from '@/api/stores'
import { gamesSortingOptions } from '@/configs/games-sorting-options.config'
import { EAppRoute } from '@/enums/app-route.enum'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useGetAllSearchParams } from '@/hooks/useGetAllSearchParams'
import { TStore } from '@/types/store.types'

import { GlassCard } from '../ui/cards/glass-card'
import { MultipleAutocomplete } from '../ui/multiple-autocomplete'

const GameDiscountsFilters = () => {
  const [stores, setStores] = useState<TStore[]>([])

  const searchParams = useGetAllSearchParams()
  const navigate = useCustomNavigate()

  const defaultStores = useMemo(() => stores.map((item) => `${item.id}`), [stores])
  const onlySelectedStores = searchParams.onlySelectedStores === 'true'

  const handleFilterChange = (newFilter: Record<string, any>) => {
    // TODO: Handle different routes if needed
    navigate({ path: `/${EAppRoute.ACTIVE_DISCOUNTS}/1`, query: newFilter, replace: true })
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await getStores()
      setStores(data)
    })()
  }, [])

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
                handleFilterChange({ sort: value })
              }}
              size="small"
              value={searchParams.sort || gamesSortingOptions[0].value}
            >
              {gamesSortingOptions.map((item) => (
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
              handleFilterChange({ storeIds: value })
            }}
            size="small"
            fullWidth
            value={(searchParams.storeIds || defaultStores) as string[]}
            disabled={!stores.length}
          />

          <FormControlLabel
            control={<Checkbox checked={onlySelectedStores} />}
            label="Overlaps"
            value={onlySelectedStores}
            onChange={(_, value) => handleFilterChange({ onlySelectedStores: value })}
          />
        </Grid2>
      </GlassCard>
    </Grid2>
  )
}

export { GameDiscountsFilters }

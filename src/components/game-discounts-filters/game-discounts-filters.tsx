'use client'

import { FormControl, Grid2, InputLabel, MenuItem, Select } from '@mui/material'
import { useRouter } from 'next/navigation'

import { EGameSorting } from '@/enums/game-sorting.enum'
import { createQueryString } from '@/helpers/createQueryString'
import { useGetAllSearchParams } from '@/hooks/useGetAllSearchParams'
import { TOption } from '@/types/option.types'

import { HollowCard } from '../hollow-card'

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
  const router = useRouter()
  const searchParams = useGetAllSearchParams()

  const sort = searchParams.sort || sortingOptions[0].value

  return (
    <Grid2 container width="100%">
      <HollowCard>
        <Grid2 padding={3} flex={1}>
          <FormControl fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              label="Sort by"
              onChange={(e) => {
                const value = e.target.value
                router.push(
                  `${window.location.pathname}${createQueryString({ ...searchParams, sort: value })}`,
                )
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
        </Grid2>
      </HollowCard>
    </Grid2>
  )
}

export { GameDiscountsFilters }

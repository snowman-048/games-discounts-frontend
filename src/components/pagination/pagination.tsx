'use client'

import { Pagination as MUIPagination } from '@mui/material'

import { useCustomNavigate } from '@/hooks/useCustomNavigate'

type TProps = {
  count: number
  page: number
  path: string
}

const Pagination = ({ count, page, path }: TProps) => {
  const navigate = useCustomNavigate()

  return (
    <MUIPagination
      count={count}
      page={+page}
      onChange={(_, value) => navigate({ path: `/${path}/${value}`, replace: true })}
    />
  )
}

export { Pagination }

'use client'

import { Pagination as MUIPagination } from '@mui/material'
import { redirect } from 'next/navigation'

type TProps = {
  count: number
  page: number
  path: string
}

const Pagination = ({ count, page, path }: TProps) => {
  return (
    <MUIPagination
      count={count}
      page={+page}
      onChange={(_, value) => redirect(`/${path}/${value}`)}
    />
  )
}

export { Pagination }

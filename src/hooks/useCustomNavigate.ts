import { useCallback } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { createQueryString } from '@/helpers/createQueryString'

import { useGetAllSearchParams } from './useGetAllSearchParams'

const useCustomNavigate = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useGetAllSearchParams()

  return useCallback(
    ({
      query = {},
      path = pathname,
      keepQuery = true,
      replace,
    }: {
      query?: Record<string, any>
      path?: string
      replace?: boolean
      keepQuery?: boolean
    }) => {
      const newQuery = { ...(keepQuery ? searchParams : {}), ...query }
      ;(replace ? router.replace : router.push)(`${path}${createQueryString(newQuery)}`)
    },
    [pathname, router, searchParams],
  )
}

export { useCustomNavigate }

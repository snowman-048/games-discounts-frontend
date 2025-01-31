import { useMemo } from 'react'

import { useSearchParams } from 'next/navigation'

const useGetAllSearchParams = () => {
  const searchParams = useSearchParams()

  return useMemo(() => {
    const params: { [anyProp: string]: string } = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }, [searchParams])
}

export { useGetAllSearchParams }

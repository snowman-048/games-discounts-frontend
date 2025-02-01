import { useMemo } from 'react'

import { useSearchParams } from 'next/navigation'

const useGetAllSearchParams = () => {
  const searchParams = useSearchParams()

  return useMemo(() => {
    const params: { [anyProp: string]: string | string[] } = {}
    searchParams.forEach((value, key) => {
      const isArray = key.includes('[]')
      if (!isArray) {
        params[key] = value
        return
      }
      const newKey = key.replace('[]', '')
      if (params[newKey]) {
        ;(params[newKey] as string[]).push(value)
      } else {
        params[newKey] = [value]
      }
    })
    return params
  }, [searchParams])
}

export { useGetAllSearchParams }

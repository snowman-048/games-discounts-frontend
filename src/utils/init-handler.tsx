'use client'

import { useEffect } from 'react'

import { setMomentLocale } from '@/helpers/setMomentLocale'
import { useAppStore } from '@/store/app.store'
import { useUserStore } from '@/store/user.store'

type TProps = {
  locale: string
}

const InitHandler = ({ locale }: TProps) => {
  const fetchUser = useUserStore((state) => state.fetchUser)
  const fetchRegions = useAppStore((state) => state.fetchRegions)
  const fetchStores = useAppStore((state) => state.fetchStores)

  useEffect(() => {
    setMomentLocale(locale)
    fetchUser()
    fetchRegions()
    fetchStores()
  }, [])

  return <></>
}

export { InitHandler }

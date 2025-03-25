'use client'

import { useEffect } from 'react'

import { useAppStore } from '@/store/app.store'
import { useUserStore } from '@/store/user.store'

const InitHandler = () => {
  const fetchUser = useUserStore((state) => state.fetchUser)
  const fetchRegions = useAppStore((state) => state.fetchRegions)
  const fetchStores = useAppStore((state) => state.fetchStores)

  useEffect(() => {
    fetchUser()
    fetchRegions()
    fetchStores()
  }, [])

  return <></>
}

export { InitHandler }

'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/store/user.store'

const UserHandler = () => {
  const fetchUser = useUserStore((state) => state.fetchUser)

  useEffect(() => {
    fetchUser()
  }, [])

  return <></>
}

export { UserHandler }

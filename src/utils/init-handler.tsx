'use client'

import { useEffect } from 'react'

import { SERVER_BUTTONS_CONFIG } from '@/configs/server-buttons.config'
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

  const handleServerButtonsHandlers = (isRemoveHandlers = false) => {
    SERVER_BUTTONS_CONFIG.forEach((config) => {
      document.querySelectorAll(config.selector).forEach((button) => {
        button[isRemoveHandlers ? 'removeEventListener' : 'addEventListener'](
          'click',
          config.onClick,
        )
        config.onAssign?.(button)
      })
    })
  }

  useEffect(() => {
    handleServerButtonsHandlers()
    setMomentLocale(locale)
    fetchUser()
    fetchRegions()
    fetchStores()

    return () => {
      handleServerButtonsHandlers(true)
    }
  }, [])

  return <></>
}

export { InitHandler }

'use client'

import { JSX, PropsWithChildren } from 'react'

import { Grid2 } from '@mui/material'

import { Loader } from '@/components/ui/loader'
import { EAppRoute } from '@/enums/app-route.enum'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useUserStore } from '@/store/user.store'

const RouteProtectionWrapper = ({ children }: PropsWithChildren) => {
  const user = useUserStore((state) => state.user)
  const isUserLoading = useUserStore((state) => state.isUserLoading)

  const navigate = useCustomNavigate()

  if (isUserLoading) {
    return (
      <Grid2 container justifyContent="center" width="100vw">
        <Loader />
      </Grid2>
    )
  }

  if (!user) {
    navigate({
      path: `/${EAppRoute.HOME}`,
      replace: true,
    })
    return <></>
  }

  return children
}

const withRouteProtection = (Component: () => JSX.Element) => () => (
  <RouteProtectionWrapper>{<Component />}</RouteProtectionWrapper>
)

export { withRouteProtection }

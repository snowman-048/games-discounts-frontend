'use client'

import { JSX, PropsWithChildren } from 'react'

import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useUserStore } from '@/store/user.store'

const RouteProtectionWrapper = ({
  children,
  requiredRoles = [],
}: PropsWithChildren<{ requiredRoles?: ERole[] }>) => {
  const user = useUserStore((state) => state.user)
  const isUserLoading = useUserStore((state) => state.isUserLoading)

  const navigate = useCustomNavigate()

  if (isUserLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  if (!user || (requiredRoles.length && !requiredRoles.includes(user.role))) {
    navigate({
      path: `/${EAppRoute.HOME}`,
      replace: true,
    })
    return <></>
  }

  return children
}

const withRouteProtection = (Component: () => JSX.Element, requiredRoles?: ERole[]) => () => (
  <RouteProtectionWrapper requiredRoles={requiredRoles}>
    <Component />
  </RouteProtectionWrapper>
)

export { withRouteProtection }

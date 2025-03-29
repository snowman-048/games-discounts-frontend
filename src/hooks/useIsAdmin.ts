import { ERole } from '@/enums/roles.enum'
import { useUserStore } from '@/store/user.store'

const useIsAdmin = () => {
  const user = useUserStore((state) => state.user)

  return user?.role === ERole.ADMIN
}

export { useIsAdmin }

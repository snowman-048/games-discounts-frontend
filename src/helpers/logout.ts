import { useUserStore } from '@/store/user.store'

import { deleteTokens } from './auth-tokens'

const logout = () => {
  useUserStore.setState({ user: null })
  localStorage.clear()
  deleteTokens()
}

export { logout }

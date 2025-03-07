import { useUserStore } from '@/store/user.store'

const logout = () => {
  localStorage.clear()
  useUserStore.setState({ user: null })
}

export { logout }

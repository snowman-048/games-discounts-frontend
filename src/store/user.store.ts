import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getCurrentUser } from '@/api/account'
import { ELocalStorageKey } from '@/enums/local-storage-key.enum'
import { TUser, TWishlist } from '@/types/user.types'

type TUserState = {
  user: TUser | null
  isUserLoading: boolean
  setUser: (payload: TUser | null) => void
  fetchUser: () => Promise<void>
  addWishlist: (wishlist: TWishlist) => void
}

const useUserStore = create<TUserState>()(
  devtools(
    (set) => ({
      user: null,

      isUserLoading: true,

      setUser: (payload) => set({ user: payload }),

      addWishlist: (wishlist) =>
        set((state) => {
          if (!state.user) {
            return state
          }
          return {
            user: { ...state.user, wishlists: [...state.user.wishlists, wishlist] },
          }
        }),

      fetchUser: async () => {
        try {
          if (!localStorage[ELocalStorageKey.ACCESS_TOKEN]) {
            return
          }
          set({ isUserLoading: true })
          const { data } = await getCurrentUser()
          set({ user: data })
        } catch (error) {
          console.log('error getting user', (error as any).message)
        } finally {
          set({ isUserLoading: false })
        }
      },
    }),
    {
      name: 'user-storage',
    },
  ),
)

export { useUserStore }

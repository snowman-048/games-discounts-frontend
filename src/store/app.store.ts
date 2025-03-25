import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getRegions } from '@/api/regions'
import { getStores } from '@/api/stores'
import { TRegionWithStores } from '@/types/region.types'
import { TStore } from '@/types/store.types'

type TAppStore = {
  regions: TRegionWithStores[]
  fetchRegions: () => Promise<void>
  stores: TStore[]
  fetchStores: () => Promise<void>
}

const useAppStore = create<TAppStore>()(
  devtools(
    (set) => ({
      regions: [],

      fetchRegions: async () => {
        try {
          const { data } = await getRegions()
          set({ regions: data })
        } catch (error) {
          console.log('error getting regions', (error as any).message)
        }
      },

      stores: [],

      fetchStores: async () => {
        try {
          const { data } = await getStores()
          set({ stores: data })
        } catch (error) {
          console.log('error getting stores', (error as any).message)
        }
      },
    }),
    {
      name: 'app-storage',
    },
  ),
)

export { useAppStore }

import { redirect } from 'next/navigation'

import { EAppRoute } from '@/enums/app-route.enum'
import { EGameSorting } from '@/enums/game-sorting.enum'

export default function Home() {
  return redirect(`${EAppRoute.ACTIVE_DISCOUNTS}/1?sort=${EGameSorting.NEWEST}`)
}

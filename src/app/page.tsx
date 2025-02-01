import { redirect } from 'next/navigation'

import { EAppRoute } from '@/enums/app-route.enum'

export default function Home() {
  return redirect(`${EAppRoute.ACTIVE_DISCOUNTS}/1`)
}

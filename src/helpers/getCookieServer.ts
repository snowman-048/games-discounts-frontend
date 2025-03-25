'use server'

import { cookies } from 'next/headers'

const getCookieServer = async (cookieName: string) => {
  const cookieStore = await cookies()
  return cookieStore.get(cookieName)?.value
}

export { getCookieServer }

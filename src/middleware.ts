import { NextRequest, NextResponse } from 'next/server'

import { getCurrentCountryByIp } from './api/third-party'
import { defaultRegions } from './configs/default-regions.config'

// const cachedRegions: TRegionWithStores[] = []

export async function middleware(req: NextRequest) {
  // if (!cachedRegions.length) {
  //   try {
  //     const { data } = await getRegions()
  //     cachedRegions.push(...data)
  //   } catch (err) {
  //     console.error('Error getting regions', err)
  //   }
  // }
  // const requestCountry = ''

  // const areAllStoresSetToCookies = defaultRegions.every(
  //   (item) => !!req.cookies.get(item.queryKey)?.value,
  // )

  // if (!areAllStoresSetToCookies) {
  //   const { data } = await getCurrentCountryByIp()
  //   console.log('data', data)
  // }

  // console.log('areAllStoresSetToCookies', areAllStoresSetToCookies)

  console.log('getCurrentCountryByIp req', (req as any).geo, req)
  try {
    const { data } = await getCurrentCountryByIp()
    console.log('getCurrentCountryByIp data', data)
  } catch (err) {
    console.error('getCurrentCountryByIp err', err)
  }

  // Handles different regions for stores
  const url = new URL(req.url)
  defaultRegions.forEach((item) => {
    url.searchParams.set(
      item.queryKey,
      `${req.cookies.get(item.queryKey)?.value || item.defaultRegion}`,
    )
  })

  // Set search params to the header to be able to access them from Layouts
  const response = NextResponse.rewrite(url)
  const searchParams = url.searchParams.toString()
  response.headers.set('searchParams', searchParams)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     * - _next (debug files)
     */
    '/((?!api|static|favicon.ico|_next|_next/image|images).*)',
  ],
}

import { NextRequest, NextResponse } from 'next/server'

import { getRegions } from './api/regions'
import { defaultRegions } from './configs/default-regions.config'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './configs/locales'
import { ECookieKey } from './enums/cookie-key.enum'
import { extractLocaleFromHeader } from './helpers/extractLocaleFromHeader'
import { TRegionWithStores } from './types/region.types'

const cachedRegions: TRegionWithStores[] = []

export async function middleware(req: NextRequest) {
  if (!cachedRegions.length) {
    try {
      const { data } = await getRegions()
      cachedRegions.push(...data)
    } catch (err) {
      console.error('Error getting regions', err)
    }
  }

  // This is only available on Vercel-hosted app
  const requestCountryCode = req.headers.get('x-vercel-ip-country')

  const url = new URL(req.url)

  // Handles different regions for stores
  const requestRegions = defaultRegions.map((item) => {
    let region: string | number | undefined = req.cookies.get(item.queryKey)?.value
    if (!region && cachedRegions.length && requestCountryCode) {
      region = cachedRegions.find(
        (regionItem) =>
          regionItem.key === requestCountryCode &&
          regionItem.regionStores.some((regionStore) => regionStore.store.name === item.storeName),
      )?.id
    }
    if (!region) {
      region = item.defaultRegion
    }
    url.searchParams.set(item.queryKey, `${region}`)

    return {
      key: item.queryKey,
      region: `${region}`,
    }
  })

  // Set search params to the header to be able to access them from Layouts
  const response = NextResponse.rewrite(url)

  const searchParams = url.searchParams.toString()
  response.headers.set('searchParams', searchParams)

  requestRegions.forEach(({ key, region }) => {
    response.cookies.set(key, region)
    req.cookies.set(key, region)
  })

  // Detect locale
  let locale = url.searchParams.get('lang')?.toLowerCase()

  if (!locale || !SUPPORTED_LOCALES.includes(locale as any)) {
    locale = req.cookies.get(ECookieKey.LOCALE)?.value
  }

  if (!locale) {
    const localeHeader = req.headers.get('accept-language')
    if (localeHeader) {
      locale = extractLocaleFromHeader(localeHeader)
    }
  }

  if (!locale) {
    locale = DEFAULT_LOCALE
  }

  response.cookies.set(ECookieKey.LOCALE, locale)

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

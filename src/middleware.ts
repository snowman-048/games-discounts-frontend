import { NextRequest, NextResponse } from 'next/server'

import { defaultRegions } from './configs/default-regions.config'
import { getStoreRegionKey } from './helpers/getStoreRegionKey'

export function middleware(req: NextRequest) {
  // Handles different regions for stores
  const url = new URL(req.url)
  defaultRegions.forEach((item) => {
    const key = getStoreRegionKey(item.storeName)
    url.searchParams.set(key, `${req.cookies.get(key)?.value || item.defaultRegion}`)
  })

  // Set search params to the header to be able to access them from Layouts
  const response = NextResponse.rewrite(url)
  const searchParams = url.searchParams.toString()
  response.headers.set('searchParams', searchParams)
  return response
}

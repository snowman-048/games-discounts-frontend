import { NextRequest, NextResponse } from 'next/server'

import { defaultRegions } from './configs/default-regions.config'
import { getStoreRegionKey } from './helpers/getStoreRegionKey'

// Handles different regions for stores
export function middleware(req: NextRequest) {
  const url = new URL(req.url)
  defaultRegions.forEach((item) => {
    const key = getStoreRegionKey(item.storeName)
    url.searchParams.set(key, `${req.cookies.get(key)?.value || item.defaultRegion}`)
  })

  return NextResponse.rewrite(url)
}

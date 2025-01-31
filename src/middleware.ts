import { NextRequest, NextResponse } from 'next/server'

import { EStore } from './enums/store.enum'
import { getStoreRegionKey } from './helpers/getStoreRegionKey'

const storesConfig = [
  { name: EStore.PSN, defaultRegion: 24 },
  { name: EStore.NINTENDO, defaultRegion: 24 },
  { name: EStore.XBOX, defaultRegion: 24 },
]

// Handles different regions for stores
export function middleware(req: NextRequest) {
  const url = new URL(req.url)
  storesConfig.forEach((item) => {
    const key = getStoreRegionKey(item.name)
    url.searchParams.set(key, `${req.cookies.get(key) || item.defaultRegion}`)
  })

  return NextResponse.rewrite(url)
}

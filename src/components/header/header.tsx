import { headers } from 'next/headers'

import { HeaderComponent } from './libs/components/header-component'

const Header = async () => {
  const headerStore = await headers()
  const searchParams = Object.fromEntries(
    new URLSearchParams(headerStore.get('searchParams') || ''),
  )

  return <HeaderComponent query={searchParams} />
}

export { Header }

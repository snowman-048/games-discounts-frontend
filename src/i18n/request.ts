import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

import { DEFAULT_LOCALE } from '@/configs/locales'
import { ECookieKey } from '@/enums/cookie-key.enum'
import { extractLocaleFromHeader } from '@/helpers/extractLocaleFromHeader'
import { getCookieServer } from '@/helpers/getCookieServer'

export default getRequestConfig(async () => {
  let locale = await getCookieServer(ECookieKey.LOCALE)

  if (!locale) {
    const currentHeaders = await headers()
    const localeHeader = currentHeaders.get('accept-language')
    if (localeHeader) {
      locale = extractLocaleFromHeader(localeHeader)
    }
  }

  if (!locale) {
    locale = DEFAULT_LOCALE
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})

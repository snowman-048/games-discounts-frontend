import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/configs/locales'
import { ECookieKey } from '@/enums/cookie-key.enum'
import { getCookieServer } from '@/helpers/getCookieServer'

export default getRequestConfig(async () => {
  const currentHeaders = await headers()
  const headerLocale = currentHeaders
    .get('accept-language')
    ?.split(',')
    .map((lang) => lang.split(';')[0].trim())
    .find((lang) => SUPPORTED_LOCALES.includes(lang))

  const locale = (await getCookieServer(ECookieKey.LOCALE)) || headerLocale || DEFAULT_LOCALE

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})

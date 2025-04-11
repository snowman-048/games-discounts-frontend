import { SUPPORTED_LOCALES } from '@/configs/locales'

const LANGUAGE_CODES: Record<string, string> = {
  ua: 'uk',
}

const getLocalesMeta = (path: string) => {
  const url = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${path}`

  return [
    ...SUPPORTED_LOCALES.map((locale) => {
      const formattedLocale = LANGUAGE_CODES[locale] || locale
      const href = `${url}?lang=${formattedLocale}`

      return {
        rel: 'alternate',
        hrefLang: formattedLocale,
        href,
        url: href,
      }
    }),
    {
      rel: 'alternate',
      hrefLang: 'x-default',
      href: url,
      url,
    },
  ]
}

export { getLocalesMeta }

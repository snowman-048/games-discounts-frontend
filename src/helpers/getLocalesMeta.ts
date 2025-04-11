import { SUPPORTED_LOCALES } from '@/configs/locales'

const getLocalesMeta = (path: string) => {
  const url = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${path}`

  return [
    ...SUPPORTED_LOCALES.map((locale) => {
      const href = `${url}?lang=${locale}`

      return {
        rel: 'alternate',
        hrefLang: locale,
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

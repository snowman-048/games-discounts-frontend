'use client'

import { useCookies } from 'next-client-cookies'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/configs/locales'
import { ECookieKey } from '@/enums/cookie-key.enum'
import { setMomentLocale } from '@/helpers/setMomentLocale'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'

import { Select } from '../ui/select'

const LanguagesSwitch = () => {
  const t = useTranslations('LanguagesSwitch')

  const cookies = useCookies()
  const router = useRouter()
  const navigate = useCustomNavigate()

  const onChange = (value: string) => {
    cookies.set(ECookieKey.LOCALE, value)
    navigate({ query: { lang: value }, replace: true })
    router.refresh()
    setMomentLocale(value)
  }

  return (
    <Select
      label={t('language')}
      size="small"
      value={cookies.get(ECookieKey.LOCALE) || DEFAULT_LOCALE}
      options={SUPPORTED_LOCALES.map((locale) => ({ title: locale.toUpperCase(), value: locale }))}
      onChange={onChange}
      containerProps={{ sx: { maxWidth: '100px' } }}
    />
  )
}

export { LanguagesSwitch }

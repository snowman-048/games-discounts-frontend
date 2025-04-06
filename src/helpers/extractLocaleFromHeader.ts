import { SUPPORTED_LOCALES } from '@/configs/locales'

const extractLocaleFromHeader = (header: string) =>
  header
    ?.split(',')
    .map((lang) => lang.split(';')[0].trim())
    .find((lang) => SUPPORTED_LOCALES.includes(lang))

export { extractLocaleFromHeader }

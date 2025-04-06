import moment from 'moment'
import 'moment/locale/ru'
import 'moment/locale/uk'

const LOCALES_MAPER: Record<string, string> = {
  ua: 'uk',
}

const setMomentLocale = (locale: string) => {
  moment.locale(LOCALES_MAPER[locale] || locale)
}

export { setMomentLocale }

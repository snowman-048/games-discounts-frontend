import moment from 'moment'
import 'moment/locale/ru'

const setMomentLocale = (locale: string) => {
  moment.locale(locale)
}

export { setMomentLocale }

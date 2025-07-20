type TValue = string | number | boolean | undefined | null

const createQueryString = (obj?: Record<string, TValue | TValue[]>, newQuery = true) => {
  if (!obj) return ''

  const keyValuePaires: string[] = []

  Object.keys(obj).forEach((key: string) => {
    const value = obj[key]
    if (value || value === 0) {
      if (Array.isArray(value)) {
        value.forEach((item) => keyValuePaires.push(`${key}[]=${item}`))
      } else {
        keyValuePaires.push(`${key}=${value}`)
      }
    }
  })

  if (!keyValuePaires.length) return ''

  return `${newQuery ? '?' : '&'}${keyValuePaires.join('&')}`
}

export { createQueryString }

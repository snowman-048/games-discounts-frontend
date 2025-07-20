import { createQueryString } from './createQueryString'

const getImageUrl = (url = '', isBig = false) => {
  // return url
  const params: Record<string, string | number> = {}
  if (url.includes('playstation.com')) {
    params.w = 300
    params.thumb = 'false'
  } else if (url.includes('microsoft.com')) {
    params.q = 90
    if (isBig) {
      params.w = 500
      params.h = 300
    } else {
      params.w = 300
      params.h = 350
    }
  }
  return `${url}${createQueryString(params, !url.includes('?'))}`
}

export { getImageUrl }

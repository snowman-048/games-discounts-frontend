const isAdEnabled = () =>
  process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_AD_ENABLED === 'true'

export { isAdEnabled }

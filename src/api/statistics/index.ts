import { api } from '..'
import { TGeneralStats } from './types'

const BASE_URL = 'stats'

const getGeneralStats = async () => api.get<TGeneralStats>(BASE_URL)

export { getGeneralStats }

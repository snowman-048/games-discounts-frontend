import { api } from '..'

const BASE_URL = 'openai'

const generateImage = (payload: { prompt: string; n: number }) =>
  api.post<string[]>(`${BASE_URL}/image`, payload)

export { generateImage }

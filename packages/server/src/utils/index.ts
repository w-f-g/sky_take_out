import { createHash } from 'crypto'

export const isDev = () => process.env.NODE_ENV === 'development'

export const md5 = (str: string) => {
  const hash = createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}
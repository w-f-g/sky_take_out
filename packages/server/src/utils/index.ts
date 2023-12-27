import { createHash } from 'crypto'

export const isDev = () => process.env.NODE_ENV === 'development'

export const md5 = (str: string) => {
  const hash = createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}

interface Constructor<T extends object> {
  new(): T
}

export const buildEntity = <T extends object , K extends keyof T>(Instance: Constructor<T>, data: Partial<Record<K, T[K]>>): T => {
  const ins = new Instance()
  Object.entries(data).forEach(([k, v]) => {
    if (Object.hasOwn(ins, k)) {
      ins[k] = v
    }
  })
  return ins
}

export const isEmpty = (value: unknown) => value === null || value === undefined

export function camelToSnake(camelCaseString: string): string {
    return camelCaseString.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)
}
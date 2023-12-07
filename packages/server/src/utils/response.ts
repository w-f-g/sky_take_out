import { IResponse } from '@sky_take_out/types'

export default class R<T = null> implements IResponse<T> {
  code: number
  data: T
  msg: string

  constructor(code: number, data: T, msg: string) {
    this.code = code
    this.data = data
    this.msg = msg
  }

  static success<K>(data: K) {
    return new R<K>(200, data, 'ok')
  }

  static error(msg: string) {
    return new R<null>(404, null, msg)
  }
}
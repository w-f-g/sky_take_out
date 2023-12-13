import { ICategoryVO } from '@sky_take_out/types'

export class CategoryVO implements ICategoryVO {
  createTime: string
  updateTime: string
  createUser: number
  updateUser: number
  id: number
  name: string
  sort: number
  status: number
  type: number
}
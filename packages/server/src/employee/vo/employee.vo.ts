import { IEmployeeLoginVO } from '@sky_take_out/types'

export class EmployeeLoginVO implements IEmployeeLoginVO {
  id: number

  name: string

  token: string
  
  userName: string
}
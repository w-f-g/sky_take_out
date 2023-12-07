import { IEmployeeLoginDTO } from '@sky_take_out/types'

export class EmployeeLoginDTO implements IEmployeeLoginDTO {
  password: string
  
  username: string
}
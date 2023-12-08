import { IEmployeeLoginDTO } from '@sky_take_out/types'
import { IsNotEmpty, IsString } from 'class-validator'

export class EmployeeLoginDTO implements IEmployeeLoginDTO {
  @IsString()
  @IsNotEmpty()
  password: string
  
  @IsString()
  @IsNotEmpty()
  username: string
}
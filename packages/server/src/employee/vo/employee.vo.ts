import { ApiProperty } from '@nestjs/swagger'
import { IEmployeeLoginVO } from '@sky_take_out/types'

export class EmployeeLoginVO implements IEmployeeLoginVO {
  @ApiProperty({ name: 'id' })
  id: number

  @ApiProperty({ name: 'name' })
  name: string

  @ApiProperty({ name: 'token' })
  token: string
  
  @ApiProperty({ name: 'userName' })
  userName: string
}
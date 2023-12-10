import { ApiProperty } from '@nestjs/swagger'
import { IEmployeeLoginVO, IEmployeePageQueryVO, IPageResult } from '@sky_take_out/types'

export class EmployeeLoginVO implements IEmployeeLoginVO {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  token: string
  
  @ApiProperty()
  userName: string
}

class EmployeePageRecord implements IEmployeePageQueryVO{
  @ApiProperty()
  createTime: string
  @ApiProperty()
  createUser: number
  @ApiProperty()
  updateTime: string
  @ApiProperty()
  updateUser: number
  @ApiProperty()
  id: number
  @ApiProperty()
  idNumber: string
  @ApiProperty()
  name: string
  @ApiProperty()
  password: string
  @ApiProperty()
  phone: string
  @ApiProperty()
  sex: string
  @ApiProperty()
  status: number
  @ApiProperty()
  username: string
}

export class EmployeePageVO implements IPageResult<IEmployeePageQueryVO> {
  @ApiProperty({ name: 'records', type: [EmployeePageRecord] })
  records: IEmployeePageQueryVO[]

  @ApiProperty()
  total: number
}
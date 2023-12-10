import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IEmployeeDTO, IEmployeeLoginDTO, IEmployeePageQueryDTO } from '@sky_take_out/types'
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

/** 员工登录 */
export class EmployeeLoginDTO implements IEmployeeLoginDTO {
  @ApiProperty({ name: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string
  
  @ApiProperty({ name: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string
}

/** 新增员工 */
export class EmployeeDTO implements IEmployeeDTO {
  @ApiPropertyOptional({ name: 'id' })
  @IsInt()
  @IsOptional()
  id?: number

  @ApiProperty({ name: 'idNumber' })
  @IsString()
  @IsNotEmpty()
  idNumber: string
  
  @ApiProperty({ name: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string
  
  @ApiProperty({ name: 'phone' })
  @IsString()
  @IsNotEmpty()
  phone: string
  
  @ApiProperty({ name: 'sex' })
  @IsString()
  @IsNotEmpty()
  sex: string
  
  @ApiProperty({ name: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string
}

/** 员工分页 */
export class EmployeePageDTO implements IEmployeePageQueryDTO {
  @ApiPropertyOptional({ name: 'name' })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ name: 'page' })
  @IsNumberString()
  @IsNotEmpty()
  page: string

  @ApiProperty({ name: 'pageSize' })
  @IsNumberString()
  @IsNotEmpty()
  pageSize: string
}
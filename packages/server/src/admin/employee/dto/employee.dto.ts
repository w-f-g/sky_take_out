import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IAddEmployeeDTO, IEmployeeDTO, IEmployeeLoginDTO, IEmployeePageQueryDTO, IPasswordEditDTO } from '@sky_take_out/types'
import { IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'
import { SexType } from 'src/utils/constant'

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
export class EmployeeDTO implements IAddEmployeeDTO {
  // @ApiPropertyOptional({ name: 'id' })
  // @IsInt()
  // @IsOptional()
  // id?: number

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
  @IsEnum(SexType)
  sex: '1' | '0'
  
  @ApiProperty({ name: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string
}

export class EditEmployeeDTO extends EmployeeDTO implements IEmployeeDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number
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

/** 修改密码 */
export class PasswordEditDTO implements IPasswordEditDTO {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  empId: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string
}
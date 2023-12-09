import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IEmployeeDTO, IEmployeeLoginDTO } from '@sky_take_out/types'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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
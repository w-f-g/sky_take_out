import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IAddressBook } from '@sky_take_out/types'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class AddressBookDTO implements IAddressBook {
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  id: number

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  userId: number

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  consignee: string
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sex: string
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  provinceCode: string
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  provinceName: string
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cityCode: string
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cityName: string
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  districtCode: string
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  districtName: string
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  detail: string
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  label: string
  
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  isDefault: number
}
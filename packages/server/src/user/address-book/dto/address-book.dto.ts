import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IAddressBookDTO, IEditAddressBookDTO } from '@sky_take_out/types'
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

export class AddressBookDTO implements IAddressBookDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  consignee: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string
  
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
  @IsInt()
  @IsOptional()
  label: number
  
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  type: number
  
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  isDefault: number
}

export class EditAddressBookDTO extends AddressBookDTO implements IEditAddressBookDTO {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  id: number
}
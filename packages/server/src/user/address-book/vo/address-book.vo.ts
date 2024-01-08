import { ApiProperty } from '@nestjs/swagger'
import { IAddressBook } from '@sky_take_out/types'

export class AddressBookVO implements IAddressBook {
  @ApiProperty()
  id: number
  @ApiProperty()
  userId: number
  @ApiProperty()
  consignee: string
  @ApiProperty()
  sex: string
  @ApiProperty()
  phone: string
  @ApiProperty()
  provinceCode: string
  @ApiProperty()
  provinceName: string
  @ApiProperty()
  cityCode: string
  @ApiProperty()
  cityName: string
  @ApiProperty()
  districtCode: string
  @ApiProperty()
  districtName: string
  @ApiProperty()
  detail: string
  @ApiProperty()
  label: string
  @ApiProperty()
  isDefault: number
}
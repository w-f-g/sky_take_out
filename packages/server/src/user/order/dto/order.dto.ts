import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IHistoryOrdersDTO, IOrderPaymentDTO, IOrdersSubmitDTO } from '@sky_take_out/types'
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { StatusConstant, PayMethod } from 'src/utils/constant'

export class OrderSubmitDTO implements IOrdersSubmitDTO {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  addressBookId: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @ApiProperty()
  @IsEnum(StatusConstant)
  deliveryStatus: 0 | 1

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  estimatedDeliveryTime: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  packAmount: number

  @ApiProperty()
  @IsEnum(PayMethod)
  payMethod: 1 | 2

  @ApiProperty()
  @IsString()
  remark: string

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  tablewareNumber: number

  @ApiProperty()
  @IsEnum(StatusConstant)
  tablewareStatus: 0 | 1
}

export class OrderPaymentDTO implements IOrderPaymentDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderNumber: string

  @ApiProperty()
  @IsEnum(PayMethod)
  payMethod: number
}

export class HistoryOrdersDTO implements IHistoryOrdersDTO {
  @ApiPropertyOptional()
  @IsOptional()
  status?: number

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  page: string

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  pageSize: string
}
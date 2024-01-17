import { ApiProperty } from '@nestjs/swagger'
import { IAdminSearchOrderDTO } from '@sky_take_out/types'
import { IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'
import { OrderStrStatus } from 'src/utils/constant'

export class AdminSearchOrderDTO implements IAdminSearchOrderDTO {
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  beginTime?: string

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endTime?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  number?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string

  @ApiProperty()
  @IsEnum(OrderStrStatus)
  @IsOptional()
  status?: string

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  page: string

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  pageSize: string
}

export class AdminConfirmOrderDTO {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  id: number
}

export class AdminRejectionOrderDTO extends AdminConfirmOrderDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rejectionReason: string
}

export class AdminCancelOrderDTO extends AdminConfirmOrderDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cancelReason: string
}
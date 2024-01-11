import { ApiProperty } from '@nestjs/swagger'
import { IOrderSubmitVO } from '@sky_take_out/types'

export class OrderSubmitVO implements IOrderSubmitVO {
  @ApiProperty()
  id: number
  @ApiProperty()
  orderAmount: number
  @ApiProperty()
  orderNumber: string
  @ApiProperty()
  orderTime: Date | string
}
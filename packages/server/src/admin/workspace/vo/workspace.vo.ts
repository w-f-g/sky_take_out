import { ApiProperty } from '@nestjs/swagger'
import { IBusinessDataVO, IOrderOverViewVO, IOverViewVO } from '@sky_take_out/types'

export class BusinessDataVO implements IBusinessDataVO {
  @ApiProperty()
  newUsers: number
  @ApiProperty()
  orderCompletionRate: number
  @ApiProperty()
  turnover: number
  @ApiProperty()
  unitPrice: number
  @ApiProperty()
  validOrderCount: number
}

export class OverViewVO implements IOverViewVO {
  @ApiProperty()
  discontinued: number
  @ApiProperty()
  sold: number
}

export class OrderOverViewVO implements IOrderOverViewVO {
  @ApiProperty()
  allOrders: number
  @ApiProperty()
  cancelledOrders: number
  @ApiProperty()
  completedOrders: number
  @ApiProperty()
  deliveredOrders: number
  @ApiProperty()
  waitingOrders: number
}
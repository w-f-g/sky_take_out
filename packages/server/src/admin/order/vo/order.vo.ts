import { ApiProperty } from '@nestjs/swagger'
import { IAdminOrderStatisticsVO, IAdminOrderVO, IAdminSearchOrderVO, IPageResult } from '@sky_take_out/types'
import { OrderVO, Order_VO } from 'src/user/order/vo/order.vo'

export class AdminSearchOrderVO extends Order_VO implements IAdminSearchOrderVO {
  @ApiProperty()
  orderDishes: string
}

export class AdminOrderVO extends OrderVO implements IAdminOrderVO {
  @ApiProperty()
  orderDishes: string
}

export class AdminSearchOrderPageResult implements IPageResult<AdminSearchOrderVO> {
  @ApiProperty({ name: 'records', type: [AdminSearchOrderVO] })
  records: AdminSearchOrderVO[]
  @ApiProperty()
  total: number
}

export class AdminOrderStatisticsVO implements IAdminOrderStatisticsVO {
  @ApiProperty()
  confirmed: number
  @ApiProperty()
  deliveryInProgress: number
  @ApiProperty()
  toBeConfirmed: number
}
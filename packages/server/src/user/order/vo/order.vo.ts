import { ApiProperty } from '@nestjs/swagger'
import { IOrderDetail, IOrderSubmitVO, IOrderVO, IPageResult } from '@sky_take_out/types'

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

export class OrderDetailVO implements IOrderDetail {
  @ApiProperty()
  id: number
  @ApiProperty()
  name: string
  @ApiProperty()
  image: string
  @ApiProperty()
  orderId: number
  @ApiProperty()
  dishId: number
  @ApiProperty()
  setmealId: number
  @ApiProperty()
  dishFlavor: string
  @ApiProperty()
  number: number
  @ApiProperty()
  amount: number
}

export class OrderVO implements IOrderVO {
  @ApiProperty()
  orderDetailList: OrderDetailVO[]
  @ApiProperty()
  id: number
  @ApiProperty()
  number: string
  @ApiProperty()
  status: number
  @ApiProperty()
  userId: number
  @ApiProperty()
  addressBookId: number
  @ApiProperty()
  orderTime: string | Date
  @ApiProperty()
  checkoutTime: string | Date
  @ApiProperty()
  payMethod: number
  @ApiProperty()
  payStatus: number
  @ApiProperty()
  amount: number
  @ApiProperty()
  remark: string
  @ApiProperty()
  phone: string
  @ApiProperty()
  address: string
  @ApiProperty()
  userName: string
  @ApiProperty()
  consignee: string
  @ApiProperty()
  cancelReason: string
  @ApiProperty()
  rejectionReason: string
  @ApiProperty()
  cancelTime: string | Date
  @ApiProperty()
  estimatedDeliveryTime: string | Date
  @ApiProperty()
  deliveryStatus: number
  @ApiProperty()
  deliveryTime: string | Date
  @ApiProperty()
  packAmount: number
  @ApiProperty()
  tablewareNumber: number
  @ApiProperty()
  tablewareStatus: number
}

export class HistoryOrdersVO implements IPageResult<OrderVO> {
  @ApiProperty({ name: 'records', type: [OrderVO] })
  records: OrderVO[]
  @ApiProperty()
  total: number
}
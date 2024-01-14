import { IPageQuery } from './common.d'

export interface IOrder {
  id: number,
  number: string,
  status: number,
  userId: number,
  addressBookId: number,
  orderTime: Date | string,
  checkoutTime: Date | string,
  payMethod: number,
  payStatus: number,
  amount: number,
  remark: string,
  phone: string,
  address: string,
  userName: string,
  consignee: string,
  cancelReason: string,
  rejectionReason: string,
  cancelTime: Date | string,
  estimatedDeliveryTime: Date | string,
  deliveryStatus: number,
  deliveryTime: Date | string,
  packAmount: number,
  tablewareNumber: number,
  tablewareStatus: number,
}

export interface IOrderDetail {
  id: number,
  name: string,
  image: string,
  orderId: number,
  dishId: number,
  setmealId: number,
  dishFlavor: string,
  number: number,
  amount: number,
}

export interface IOrdersSubmitDTO {
  /** 地址簿id */
  addressBookId: number,
  /** 总金额 */
  amount: number,
  /** 配送状态：  1立即送出  0选择具体时间 */
  deliveryStatus: number,
  /** 预计送达时间 */
  estimatedDeliveryTime: string,
  /** 打包费 */
  packAmount: number,
  /** 付款方式 */
  payMethod: number,
  /** 备注 */
  remark: string,
  /** 餐具数量 */
  tablewareNumber: number,
  /** 餐具数量状态  1按餐量提供  0选择具体数量 */
  tablewareStatus: number,
}

export interface IOrderSubmitVO {
  /** 订单id */
  id: number,
  /** 订单金额 */
  orderAmount: number,
  /** 订单号 */
  orderNumber: string,
  /** 下单时间 */
  orderTime: Date | string,
}

export interface IOrderPaymentDTO {
  /** 订单号 */
  orderNumber: string,
  /** 支付方式 */
  payMethod: number,
}

export interface IHistoryOrdersDTO extends IPageQuery {
  status?: number,
}

export interface IOrderVO extends IOrder {
  orderDetailList: IOrderDetail[],
}

export interface IAdminSearchOrderDTO extends IPageQuery {
    beginTime?: string,
    endTime?: string,
    number?: string,
    phone?: string,
    status?: string,
}

export interface IAdminSearchOrderVO extends IOrder {
  orderDishes: string,
}

export interface IAdminOrderStatisticsVO {
    /** 待派送数量 */
    confirmed: number,
    /** 派送中数量 */
    deliveryInProgress: number,
    /** 待接单数量 */
    toBeConfirmed: number,
}

export interface IAdminOrderVO extends IAdminSearchOrderVO {
  orderDetailList: IOrderDetail[],
}
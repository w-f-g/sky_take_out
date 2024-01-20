export interface IBusinessDataVO {
  /** 新增用户数 */
  newUsers: number,
  /** 订单完成率 */
  orderCompletionRate: number,
  /** 营业额 */
  turnover: number,
  /** 平均客单价 */
  unitPrice: number,
  /** 有效订单数 */
  validOrderCount: number,
}

export interface IOverViewVO {
  /** 已停售套餐数量 */
  discontinued: number,
  /** 已启售套餐数量 */
  sold: number,
}

export interface IOrderOverViewVO {
  /** 全部订单 */
  allOrders: number,
  /** 已取消数量 */
  cancelledOrders: number,
  /** 已完成数量 */
  completedOrders: number,
  /** 待派送数量 */
  deliveredOrders: number,
  /** 待接单数量 */
  waitingOrders: number,
}
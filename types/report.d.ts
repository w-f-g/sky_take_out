export interface IReportDTO {
  begin: string,
  end: string,
}

export interface ITurnoverStatisticsVO {
  dateList: string,
  turnoverList: string,
}

export interface IUserStatisticsVO {
  /** 日期列表，以逗号分隔 */
  dateList: string,
  /** 新增用户数列表，以逗号分隔 */
  newUserList: string,
  /** 总用户量列表，以逗号分隔 */
  totalUserList: string,
}

export interface IOrdersStatisticsVO {
  /** 日期列表，以逗号分隔 */
  dateList: string,
  /** 订单完成率 */
  orderCompletionRate: number,
  /** 订单数列表，以逗号分隔 */
  orderCountList: string,
  /** 订单总数 */
  totalOrderCount: number,
  /** 有效订单数 */
  validOrderCount: number,
  /** 有效订单数列表，以逗号分隔 */
  validOrderCountList: string,
}

export interface ISalesTop10ReportVO {
  /** 商品名称列表，以逗号分隔 */
  nameList: string,
  /** 销量列表，以逗号分隔 */
  numberList: string,
}
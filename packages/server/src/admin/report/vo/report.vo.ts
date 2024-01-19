import { ApiProperty } from '@nestjs/swagger'
import { IOrdersStatisticsVO, ISalesTop10ReportVO, ITurnoverStatisticsVO, IUserStatisticsVO } from '@sky_take_out/types'

export class TurnoverStatisticsVO implements ITurnoverStatisticsVO {
  @ApiProperty()
  dateList: string
  @ApiProperty()
  turnoverList: string
}

export class UserStatisticsVO implements IUserStatisticsVO {
  @ApiProperty()
  dateList: string
  @ApiProperty()
  newUserList: string
  @ApiProperty()
  totalUserList: string
}

export class OrdersStatisticsVO implements IOrdersStatisticsVO {
  @ApiProperty()
  dateList: string
  @ApiProperty()
  orderCompletionRate: number
  @ApiProperty()
  orderCountList: string
  @ApiProperty()
  totalOrderCount: number
  @ApiProperty()
  validOrderCount: number
  @ApiProperty()
  validOrderCountList: string
}

export class SalesTop10ReportVO implements ISalesTop10ReportVO {
  @ApiProperty()
  nameList: string
  @ApiProperty()
  numberList: string
}
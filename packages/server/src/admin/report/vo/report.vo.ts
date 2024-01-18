import { ApiProperty } from '@nestjs/swagger'
import { ITurnoverStatisticsVO } from '@sky_take_out/types'

export class TurnoverStatisticsVO implements ITurnoverStatisticsVO {
  @ApiProperty()
  dateList: string
  @ApiProperty()
  turnoverList: string
}
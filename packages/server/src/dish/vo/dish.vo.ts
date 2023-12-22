import { ApiProperty } from '@nestjs/swagger'
import { IDishPageVO, IPageResult } from '@sky_take_out/types'

export class DishPageVO implements IDishPageVO {
  @ApiProperty()
  categoryName: string

  @ApiProperty()
  updateTime: string

  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  price: number

  @ApiProperty()
  image: string

  @ApiProperty()
  description: string

  @ApiProperty()
  status: number
}

export class DishPageResult implements IPageResult<DishPageVO> {
  @ApiProperty({ name: 'records', type: DishPageVO })
  records: DishPageVO[]

  @ApiProperty()
  total: number
}
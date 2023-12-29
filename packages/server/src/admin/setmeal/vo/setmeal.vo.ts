import { ApiProperty } from '@nestjs/swagger'
import { IPageResult, ISetmealDish, ISetmealPageVO, ISetmealVO } from '@sky_take_out/types'

export class SetmealVO implements ISetmealVO {
  @ApiProperty()
  updateTime: string
  @ApiProperty()
  id: number
  @ApiProperty()
  categoryId: number
  @ApiProperty()
  name: string
  @ApiProperty()
  price: number
  @ApiProperty()
  status: number
  @ApiProperty()
  description: string
  @ApiProperty()
  image: string
  @ApiProperty()
  setmealDishes: ISetmealDish[]
}

export class SetmealPageVO implements ISetmealPageVO {
  @ApiProperty()
  updateTime: string
  @ApiProperty()
  categoryName: string
  @ApiProperty()
  id: number
  @ApiProperty()
  name: string
  @ApiProperty()
  price: number
  @ApiProperty()
  categoryId: number
  @ApiProperty()
  status: number
  @ApiProperty()
  description: string
  @ApiProperty()
  image: string
}

export class SetmealPageResult implements IPageResult<ISetmealPageVO> {
  @ApiProperty({ type: [SetmealPageVO] })
  records: ISetmealPageVO[]

  @ApiProperty()
  total: number
}
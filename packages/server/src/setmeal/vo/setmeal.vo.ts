import { ApiProperty } from '@nestjs/swagger'
import { ISetmealDish, ISetmealVO } from '@sky_take_out/types'

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
import { ApiProperty } from '@nestjs/swagger'
import { IShoppingCart } from '@sky_take_out/types'

export class ShoppingCartVO implements IShoppingCart {
  @ApiProperty()
  amount: number
  @ApiProperty()
  createTime: string
  @ApiProperty()
  dishFlavor: string
  @ApiProperty()
  dishId: number
  @ApiProperty()
  id: number
  @ApiProperty()
  image: string
  @ApiProperty()
  name: string
  @ApiProperty()
  number: number
  @ApiProperty()
  setmealId: number
  @ApiProperty()
  userId: number
}
import { ApiProperty } from '@nestjs/swagger'
import { IUserSetmealDishVO } from '@sky_take_out/types'

export class UserSetmealDishVO implements IUserSetmealDishVO {
  @ApiProperty()
  copies: number
  @ApiProperty()
  description: string
  @ApiProperty()
  image: string
  @ApiProperty()
  name: string
}
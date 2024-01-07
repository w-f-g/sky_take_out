import { ApiPropertyOptional } from '@nestjs/swagger'
import { IShoppingCartDTO } from '@sky_take_out/types'
import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class ShoppingCartDTO implements IShoppingCartDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  dishFlavor?: string

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  dishId?: number

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  setmealId?: number
}
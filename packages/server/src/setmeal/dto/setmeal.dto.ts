import { ApiProperty } from '@nestjs/swagger'
import { ISetmealAddDTO, ISetmealDishAdd } from '@sky_take_out/types'
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { StatusConstant } from 'src/utils/constant'

export class SetmealDishAdd implements ISetmealDishAdd {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number
  
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  setmealId: number
  
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  dishId: number
  
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  copies: number
}

export class SetmealAddDTO implements ISetmealAddDTO {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  categoryId: number
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number
  
  @ApiProperty()
  @IsEnum(StatusConstant)
  status: 0 | 1
  
  @ApiProperty()
  @IsString()
  description: string
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string
  
  @ApiProperty({ type: [SetmealDishAdd] })
  @IsArray()
  setmealDishes: SetmealDishAdd[]
}

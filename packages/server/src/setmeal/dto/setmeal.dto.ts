import { ApiProperty } from '@nestjs/swagger'
import { ISetmeal, ISetmealAddDTO, ISetmealDish, ISetmealDishAdd } from '@sky_take_out/types'
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

class SetmealCommon {
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
}

export class SetmealAddDTO extends SetmealCommon implements ISetmealAddDTO {
  @ApiProperty({ type: [SetmealDishAdd] })
  @IsArray()
  setmealDishes: SetmealDishAdd[]
}

class SetmealDish extends SetmealDishAdd implements ISetmealDish {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number
}

export class SetmealDTO extends SetmealCommon implements ISetmeal {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number
  
  @ApiProperty({ type: [SetmealDish] })
  @IsArray()
  setmealDishes: ISetmealDish[]
}
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ISetmealAddDTO, ISetmealDish, ISetmealDishAdd, ISetmealEditDTO, ISetmealPageQueryDTO } from '@sky_take_out/types'
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { SexType as StatusConstantStr } from 'src/utils/constant'

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
  
  // @ApiProperty()
  // @IsEnum(StatusConstant)
  // status: 0 | 1
  
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

export class SetmealDTO extends SetmealCommon implements ISetmealEditDTO {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number
  
  @ApiProperty({ type: [SetmealDish] })
  @IsArray()
  setmealDishes: ISetmealDish[]
}

export class SetmealPageQueryDTO implements ISetmealPageQueryDTO {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  categoryId?: string

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string

  @ApiPropertyOptional()
  @IsEnum(StatusConstantStr)
  @IsOptional()
  status?: 0 | 1
  
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  page: string

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  pageSize: string
}
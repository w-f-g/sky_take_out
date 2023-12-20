import { ApiProperty } from '@nestjs/swagger'
import { IAddDish, IDish, IDishFlavor } from '@sky_take_out/types'
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { StatusConstant } from 'src/utils/constant'

export class AddDishDTO implements IAddDish {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  categoryId: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsEnum(StatusConstant)
  status: 0 | 1

  @ApiProperty()
  @IsArray()
  flavors: DishFlavorDTO[]
}

export class DishDTO extends AddDishDTO implements IDish {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number
}

 export class DishFlavorDTO implements IDishFlavor {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  dishId: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string
}
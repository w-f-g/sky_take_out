import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IAddDish, IDish, IDishFlavor, IDishPageQueryDTO } from '@sky_take_out/types'
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { StatusConstant, SexType as StatusConstantStr } from 'src/utils/constant'

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

export class DishPageQueryDTO implements IDishPageQueryDTO {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  categoryId?: string

  @ApiPropertyOptional()
  @IsString()
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
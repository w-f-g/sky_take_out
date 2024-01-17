import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IAddCategoryDTO, ICategoryPageQueryDTO, IEditCategoryDTO } from '@sky_take_out/types'
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'
import { CategoryTypeString } from 'src/utils/constant'

/** 修改分类 DTO */
export class EditCategoryDTO implements IEditCategoryDTO {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  id: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string
  
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  sort: number

  @ApiProperty()
  @IsEnum(CategoryTypeString)
  @IsOptional()
  type?: 1 | 2
}

/** 分类分页查询 DTO */
export class CategoryPageQueryDTO implements ICategoryPageQueryDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string
  
  @ApiProperty()
  @IsEnum(CategoryTypeString)
  @IsOptional()
  type?: 1 | 2
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  page: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pageSize: string
}

/** 新增分类 DTO */
export class AddCategoryDTO implements IAddCategoryDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  sort: number

  @ApiProperty()
  @IsEnum(CategoryTypeString)
  type: 1 | 2
}
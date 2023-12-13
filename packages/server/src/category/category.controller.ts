import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CategoryService } from './category.service'
import { ApiTags } from '@nestjs/swagger'
import { AddCategoryDTO, CategoryPageQueryDTO, EditCategoryDTO } from './dto/category.dto'
import R from 'src/utils/response'
import { CategoryVO } from './vo/category.vo'

@ApiTags('分类相关接口')
@Controller('/admin/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Put()
  async editCategory(@Body() data: EditCategoryDTO) {
    return R.success(null)
  }

  @Get('/page')
  async categoryPageQuery(@Query() query: CategoryPageQueryDTO): Promise<R<CategoryVO>> {
    return R.success(null)
  }

  @Post('/status/:status')
  async changeCategoryStatus(
    @Query('id') id: string,
    @Param('status') status
  ) {
    return R.success(null)
  }

  @Post()
  async addCategory(@Body() data: AddCategoryDTO) {
    return R.success(null)
  }

  @Delete()
  async deleteCategory(@Query('id') id: string) {
    return R.success(null)
  }

  @Get('/list')
  async getCategoryListByType(@Query('type') type: string) {
    return R.success(null)
  }
}

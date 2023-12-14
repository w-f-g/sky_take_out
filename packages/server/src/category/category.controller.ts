import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AddCategoryDTO, CategoryPageQueryDTO, EditCategoryDTO } from './dto/category.dto'
import R from 'src/utils/response'
import { CategoryPageVO } from './vo/category.vo'
import { AuthGuard } from 'src/guards/auth.guard'

@ApiBearerAuth('bearer')
@ApiTags('分类相关接口')
@UseGuards(AuthGuard)
@Controller('/admin/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '修改分类' })
  @Put()
  async editCategory(@Body() data: EditCategoryDTO, @Request() req) {
    const { empId } = req.meta.userInfo
    await this.categoryService.editCategoryService(data, +empId)
    return R.success(null)
  }

  @ApiOkResponse({ type: CategoryPageVO })
  @ApiOperation({ summary: '分类分页查询' })
  @Get('/page')
  async categoryPageQuery(@Query() query: CategoryPageQueryDTO): Promise<R<CategoryPageVO>> {
    const res = await this.categoryService.categoryPageQueryService(query)
    return R.success(res)
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

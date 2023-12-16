import { Body, Controller, Delete, Get, Param, ParseEnumPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AddCategoryDTO, CategoryPageQueryDTO, EditCategoryDTO } from './dto/category.dto'
import R from 'src/utils/response'
import { CategoryPageVO } from './vo/category.vo'
import { AuthGuard } from 'src/guards/auth.guard'
import { CategoryType, StatusConstant } from 'src/utils/constant'

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

  @ApiOperation({ summary: '启用、禁用分类' })
  @Post('/status/:status')
  async changeCategoryStatus(
    @Query('id') id: string,
    @Param(
      'status',
      new ParseEnumPipe(StatusConstant)
    )
    status: StatusConstant,
    @Request() req
  ) {
    const { empId } = req.meta.userInfo
    await this.categoryService.changeCategoryStatusService(id, status, +empId)
    return R.success(null)
  }

  @ApiOperation({ summary: '新增分类' })
  @Post()
  async addCategory(@Body() data: AddCategoryDTO, @Request() req) {
    const { empId } = req.meta.userInfo
    await this.categoryService.addCategoryService(data, +empId)
    return R.success(null)
  }

  @ApiOperation({ summary: '根据id删除分类' })
  @Delete()
  async deleteCategory(@Query('id') id: string) {
    await this.categoryService.deleteCategoryServer(id)
    return R.success(null)
  }

  @ApiOperation({ summary: '根据类型查询分类' })
  @Get('/list')
  async getCategoryListByType(@Query('type', new ParseEnumPipe(CategoryType)) type: CategoryType) {
    const categoryList = await this.categoryService.getCategoryListByType(type)
    return R.success(categoryList)
  }
}
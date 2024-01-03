import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import R from 'src/utils/response'
import { CategoryVO } from 'src/admin/category/vo/category.vo'

@ApiBearerAuth('bearer')
@ApiTags('C端-分类接口')
@UseGuards(UserAuthGuard)
@Controller('/user/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({ type: [CategoryVO] })
  @ApiOperation({ summary: '查询分类' })
  @Get('/list')
  async getCategoryListByType(@Query('type') type: string | undefined) {
    const parsedType = type !== undefined ? parseInt(type, 10) : undefined
    const res = await this.categoryService.list(parsedType)
    return R.success(res)
  }
}

import { Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common'
import { DishService } from './dish.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import R from 'src/utils/response'
import { DishVO } from 'src/admin/dish/vo/dish.vo'

@ApiBearerAuth('bearer')
@ApiTags('C端-菜品浏览接口')
@UseGuards(UserAuthGuard)
@Controller('/user/dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @ApiOkResponse({ type: [DishVO] })
  @ApiOperation({ summary: '根据分类id查询菜品' })
  @Get('/list')
  async getDishListByCategoryId(@Query('categoryId', new ParseIntPipe()) categoryId: number) {
    const res = await this.dishService.list(categoryId)
    return R.success(res)
  }
}

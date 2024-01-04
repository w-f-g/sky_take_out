import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common'
import { SetmealService } from './setmeal.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import R from 'src/utils/response'
import { Setmeal } from 'src/admin/setmeal/entities/setmeal.entity'
import { UserSetmealDishVO } from './vo/setmeal.vo'

@ApiBearerAuth('bearer')
@ApiTags('C端-套餐浏览接口')
@UseGuards(UserAuthGuard)
@Controller('/user/setmeal')
export class SetmealController {
  constructor(private readonly setmealService: SetmealService) {}

  @ApiOkResponse({ type: [Setmeal] })
  @ApiOperation({ summary: '根据分类id查询套餐' })
  @Get('/list')
  async getSetmealListByCategoryId(@Query('categoryId', new ParseIntPipe()) categoryId: number) {
    const res = await this.setmealService.list(categoryId)
    return R.success(res)
  }

  @ApiOkResponse({ type: [UserSetmealDishVO] })
  @ApiOperation({ summary: '根据套餐id查询包含的菜品' })
  @Get('/dish/:id')
  async getDishBySetmealId(@Param('id', new ParseIntPipe()) setmealId: number) {
    const res = await this.setmealService.getDishBySetmealId(setmealId)
    return R.success(res)
  }
}

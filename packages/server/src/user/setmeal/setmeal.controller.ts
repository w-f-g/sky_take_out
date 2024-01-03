import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common'
import { SetmealService } from './setmeal.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import R from 'src/utils/response'

@ApiBearerAuth('bearer')
@ApiTags('C端-套餐浏览接口')
@UseGuards(UserAuthGuard)
@Controller('/user/setmeal')
export class SetmealController {
  constructor(private readonly setmealService: SetmealService) {}

  @Get('/list')
  async getSetmealListByCategoryId(@Query('categoryId', new ParseIntPipe()) categoryId: number) {
    return R.success(null)
  }

  @Get('/dish/:id')
  async getDishBySetmealId(@Param('id', new ParseIntPipe()) setmealId: number) {
    return R.success(null)
  }
}

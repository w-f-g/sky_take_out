import { Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common'
import { DishService } from './dish.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import R from 'src/utils/response'

@ApiBearerAuth('bearer')
@ApiTags('C端-菜品浏览接口')
@UseGuards(UserAuthGuard)
@Controller('/user/dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get('/list')
  async getDishListByCategoryId(@Query('categoryId', new ParseIntPipe()) categoryId: number) {
    return R.success(null)
  }
}

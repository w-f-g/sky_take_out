import { Controller, Get, HttpException, HttpStatus, Inject, ParseIntPipe, Query, UseGuards } from '@nestjs/common'
import { DishService } from './dish.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import R from 'src/utils/response'
import { DishVO } from 'src/admin/dish/vo/dish.vo'
import { REDIS_SERVICE_KEY } from 'src/db/redis.service'
import { RedisClientType } from 'redis'
import { isEmpty } from 'src/utils'

@ApiBearerAuth('bearer')
@ApiTags('C端-菜品浏览接口')
@UseGuards(UserAuthGuard)
@Controller('/user/dish')
export class DishController {
  @Inject(DishService)
  private readonly dishService: DishService

  @Inject(REDIS_SERVICE_KEY)
  private redisClient: RedisClientType

  @ApiOkResponse({ type: [DishVO] })
  @ApiOperation({ summary: '根据分类id查询菜品' })
  @Get('/list')
  async getDishListByCategoryId(@Query('categoryId', new ParseIntPipe()) categoryId: number) {
    // 查询 redis 中是否存在菜品数据
    const key = 'SKY_TAKE_OUT_DISH_' + categoryId
    await this.redisClient.del(key)
    const data = await this.redisClient.get(key)
    // 如果存在，直接返回，无需查询数据库
    if (data !== '' && !isEmpty(data)) {
      let list
      try {
        list = JSON.parse(data)
      } catch (error) {
        throw new HttpException(error, HttpStatus.FORBIDDEN)
      }
      if (Array.isArray(list)) {
        return R.success(list)
      }
    }
    // 如果不存在，查询数据库，将查询到的数据放入 redis 中
    const res = await this.dishService.list(categoryId)
    await this.redisClient.set(key, JSON.stringify(res))
    return R.success(res)
  }
}

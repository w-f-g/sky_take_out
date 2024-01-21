import { Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common'
import { SetmealService } from './setmeal.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import R from 'src/utils/response'
import { Setmeal } from 'src/admin/setmeal/entities/setmeal.entity'
import { UserSetmealDishVO } from './vo/setmeal.vo'
import { REDIS_SERVICE_KEY } from 'src/db/redis.service'
import { RedisClientType } from 'redis'
import { isEmpty } from 'class-validator'

@ApiTags('C端-套餐浏览接口')
@UseGuards(UserAuthGuard)
@Controller('/user/setmeal')
export class SetmealController {
  @Inject(SetmealService)
  private readonly setmealService: SetmealService

  @Inject(REDIS_SERVICE_KEY)
  private redisClient: RedisClientType

  @ApiOkResponse({ type: [Setmeal] })
  @ApiOperation({ summary: '根据分类id查询套餐' })
  @Get('/list')
  async getSetmealListByCategoryId(@Query('categoryId', new ParseIntPipe()) categoryId: number) {
    // 查询 redis 中是否存在套餐数据
    const key = 'SKY_TAKE_OUT_SETMEAL_' + categoryId
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
    const res = await this.setmealService.list(categoryId)
    await this.redisClient.set(key, JSON.stringify(res))
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

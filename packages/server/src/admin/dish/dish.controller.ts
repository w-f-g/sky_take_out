import { Body, Controller, Delete, Get, Inject, Param, ParseArrayPipe, ParseEnumPipe, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { DishService } from './dish.service'
import R from 'src/utils/response'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AddDishDTO, DishDTO, DishPageQueryDTO } from './dto/dish.dto'
import { DishPageResult, DishVO } from './vo/dish.vo'
import { StatusConstant } from 'src/utils/constant'
import { AdminAuthGuard } from 'src/auth/AdminAuth.guard'
import { Dish } from './entities/dish.entity'
import { REDIS_SERVICE_KEY } from 'src/db/redis.service'
import { RedisClientType } from 'redis'

@ApiTags('菜品相关接口')
@UseGuards(AdminAuthGuard)
@Controller('/admin/dish')
export class DishController {
  @Inject()
  private readonly dishService: DishService
  
  @Inject(REDIS_SERVICE_KEY)
  private redisClient: RedisClientType

  private REDIS_KEY_PREFIX = 'SKY_TAKE_OUT_DISH_'

  @ApiOperation({ summary: '修改菜品' })
  @Put()
  async editDish(@Body() dish: DishDTO) {
    await this.dishService.editDish(dish)
    await this.clearCache()
    return R.success(null)
  }
  
  @ApiOperation({ summary: '批量删除菜品' })
  @Delete()
  async deleteDishs(
    @Query(
      'ids',
      new ParseArrayPipe({
        items: Number,
      })
    )
    ids: number[],
  ) {
    await this.dishService.deleteDishs(ids)
    await this.clearCache()
    return R.success(null)
  }
  
  @ApiOperation({ summary: '新增菜品' })
  @Post()
  async addDish(@Body() data: AddDishDTO) {
    await this.dishService.addDish(data)
    // 清理缓存数据
    await this.redisClient.del(this.REDIS_KEY_PREFIX + data.categoryId)
    return R.success(null)
  }

  @ApiOkResponse({ type: [Dish] })
  @ApiOperation({ summary: '根据分类id查询菜品' })
  @Get('/list')
  async getDishByCategoryId(@Query('categoryId', new ParseIntPipe()) categoryId: number) {
    const res = await this.dishService.getDishByCategoryId(categoryId)
    return R.success(res)
  }

  @ApiOkResponse({ type: DishPageResult })
  @ApiOperation({ summary: '菜品分页查询' })
  @Get('/page')
  async getDishPageQuery(@Query() query: DishPageQueryDTO): Promise<R<DishPageResult>> {
    const res = await this.dishService.getDishPage(query)
    return R.success(res)
  }
  
  @ApiOkResponse({ type: DishVO })
  @ApiOperation({ summary: '根据id查询菜品' })
  @Get('/:id')
  async getDishById(@Param('id', new ParseIntPipe()) id: number): Promise<R<DishVO>> {
    const res = await this.dishService.getDishById(id)
    return R.success(res)
  }

  @ApiOperation({ summary: '菜品起售、停售' })
  @Post('/status/:status')
  async changeDishStatus(
    @Query('id', new ParseIntPipe()) id: number,
    @Param(
      'status',
      new ParseEnumPipe(StatusConstant)
    )
    status: StatusConstant,
  ) {
    await this.dishService.changeDishStatus(id, status)
    await this.clearCache()
    return R.success(null)
  }

  private async clearCache() {
    // 将所有的菜品缓存数据清理掉，所有以 SKY_TAKE_OUT_DISH_ 开头的 key
    const keys = await this.redisClient.keys(this.REDIS_KEY_PREFIX + '*')
    if (keys.length > 0) {
      await this.redisClient.del(keys)
    }
  }
}

import { Body, Controller, Delete, Get, Inject, Param, ParseArrayPipe, ParseEnumPipe, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { SetmealService } from './setmeal.service'
import R from 'src/utils/response'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SetmealPageResult, SetmealVO } from './vo/setmeal.vo'
import { SetmealAddDTO, SetmealDTO, SetmealPageQueryDTO } from './dto/setmeal.dto'
import { StatusConstant } from 'src/utils/constant'
import { AdminAuthGuard } from 'src/auth/AdminAuth.guard'
import { REDIS_SERVICE_KEY } from 'src/db/redis.service'
import { RedisClientType } from 'redis'

@ApiBearerAuth('bearer')
@ApiTags('套餐相关接口')
@UseGuards(AdminAuthGuard)
@Controller('/admin/setmeal')
export class SetmealController {
  @Inject(SetmealService)
  private readonly setmealService: SetmealService

  @Inject(REDIS_SERVICE_KEY)
  private redisClient: RedisClientType
  
  private REDIS_KEY_PREFIX = 'SKY_TAKE_OUT_SETMEAL_'

  @ApiOperation({ summary: '修改套餐' })
  @Put()
  async editSetmeal(@Body() data: SetmealDTO) {
    await this.setmealService.editSetmeal(data)
    await this.clearCache()
    return R.success(null)
  }

  @ApiOkResponse({ type: SetmealPageResult })
  @ApiOperation({ summary: '分页查询' })
  @Get('/page')
  async getSetmealPageQuery(@Query() query: SetmealPageQueryDTO) {
    const res = await this.setmealService.getSetmealPageQuery(query)
    return R.success(res)
  }

  @ApiOperation({ summary: '套餐起售、停售' })
  @Post('/status/:status')
  async changeSetmealStatus(
    @Query('id', new ParseIntPipe()) id: number,
    @Param(
      'status',
      new ParseEnumPipe(StatusConstant),
    )
    status: StatusConstant
  ) {
    await this.setmealService.changeSetmealStatus(id, status)
    await this.clearCache()
    return R.success(null)
  }

  @ApiOperation({ summary: '批量删除套餐' })
  @Delete()
  async deleteSetmeal(
    @Query(
      'ids',
      new ParseArrayPipe({ items: Number })
    )
    ids: number[]
  ) {
    await this.setmealService.deleteSetmealByIds(ids)
    await this.clearCache()
    return R.success(null)
  }

  @ApiOperation({ summary: '新增套餐' })
  @Post()
  async addSetmeal(@Body() data: SetmealAddDTO) {
    await this.setmealService.addSetmeal(data)
    // 清理缓存数据
    await this.redisClient.del(this.REDIS_KEY_PREFIX + data.categoryId)
    return R.success(null)
  }

  @ApiOkResponse({ type: SetmealVO })
  @ApiOperation({ summary: '根据id查询套餐' })
  @Get('/:id')
  async getSetmealById(@Param('id', new ParseIntPipe()) id: number) {
    const res = await this.setmealService.getSetmealById(id)
    return R.success(res)
  }
  
  private async clearCache() {
    // 将所有的菜品缓存数据清理掉，所有以 SKY_TAKE_OUT_DISH_ 开头的 key
    const keys = await this.redisClient.keys(this.REDIS_KEY_PREFIX + '*')
    if (keys.length > 0) {
      await this.redisClient.del(keys)
    }
  }
}

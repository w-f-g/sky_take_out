import { Controller, Get, Inject, Param, ParseEnumPipe, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RedisClientType } from 'redis'
import { AdminAuthGuard } from 'src/auth/AdminAuth.guard'
import { REDIS_SERVICE_KEY } from 'src/db/redis.service'
import { StatusConstant } from 'src/utils/constant'
import R from 'src/utils/response'

@ApiBearerAuth('bearer')
@ApiTags('店铺操作接口')
@UseGuards(AdminAuthGuard)
@Controller('/admin/shop')
export class AdminShopController {

  @Inject(REDIS_SERVICE_KEY)
  private redisClient: RedisClientType

  private SHOP_STATUS_KEY = 'SKY_TAKE_OUT_SHOP_STATUS'

  @ApiOkResponse({ type: Number })
  @ApiOperation({ summary: '获取营业状态' })
  @Get('/status')
  async getShopStatus() {
    const res = await this.redisClient.get(this.SHOP_STATUS_KEY)
    return R.success(Number(res))
  }

  @ApiOperation({ summary: '设置营业状态' })
  @Put('/:status')
  async setShopStatus(@Param('status', new ParseEnumPipe(StatusConstant)) status: StatusConstant) {
    await this.redisClient.set(this.SHOP_STATUS_KEY, status)
    return R.success(null)
  }
}

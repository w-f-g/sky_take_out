import { Controller, Get, Inject } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RedisClientType } from 'redis'
import { REDIS_SERVICE_KEY } from 'src/db/redis.service'
import R from 'src/utils/response'

@ApiTags('C端-店铺操作接口')
@Controller('/user/shop')
export class UserShopController {

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
}

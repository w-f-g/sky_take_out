import { Module } from '@nestjs/common'
import { AdminShopController } from './shop.controller'

@Module({
  controllers: [AdminShopController],
})
export class ShopModule {}

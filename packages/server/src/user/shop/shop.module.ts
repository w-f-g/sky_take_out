import { Module } from '@nestjs/common'
import { UserShopController } from './shop.controller'

@Module({
  controllers: [UserShopController],
})
export class UserShopModule {}

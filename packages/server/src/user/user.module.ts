import { Module } from '@nestjs/common'
import { UserShopModule } from './shop/shop.module'
import { WXUserModule } from './user/user.module'

@Module({
  imports: [
    UserShopModule,
    WXUserModule,
  ]
})
export class UserRootModule {}

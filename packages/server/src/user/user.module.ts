import { Module } from '@nestjs/common'
import { UserShopModule } from './shop/shop.module'

@Module({
  imports: [UserShopModule]
})
export class UserModule {}

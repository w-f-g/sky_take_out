import { Module } from '@nestjs/common'
import { UserShopModule } from './shop/shop.module'
import { WXUserModule } from './user/user.module'
import { UserCategoryModule } from './category/category.module'
import { UserDishModule } from './dish/dish.module'
import { UserSetmealModule } from './setmeal/setmeal.module'

@Module({
  imports: [
    UserShopModule,
    WXUserModule,
    UserCategoryModule,
    UserDishModule,
    UserSetmealModule,
  ]
})
export class UserRootModule {}

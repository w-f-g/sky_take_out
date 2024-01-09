import { Module } from '@nestjs/common'
import { UserShopModule } from './shop/shop.module'
import { WXUserModule } from './user/user.module'
import { UserCategoryModule } from './category/category.module'
import { UserDishModule } from './dish/dish.module'
import { UserSetmealModule } from './setmeal/setmeal.module'
import { UserShoppingCartModule } from './shopping-cart/shopping-cart.module'
import { UserAddressBookModule } from './address-book/address-book.module'
import { UserOrderModule } from './order/order.module'

@Module({
  imports: [
    UserShopModule,
    WXUserModule,
    UserCategoryModule,
    UserDishModule,
    UserSetmealModule,
    UserShoppingCartModule,
    UserAddressBookModule,
    UserOrderModule,
  ]
})
export class UserRootModule {}

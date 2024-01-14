import { Module } from '@nestjs/common'
import { EmployeeModule } from './employee/employee.module'
import { CategoryModule } from './category/category.module'
import { DishModule } from './dish/dish.module'
import { SetmealModule } from './setmeal/setmeal.module'
import { ShopModule } from './shop/shop.module'
import { AdminOrderModule } from './order/order.module'

@Module({
  imports: [
    EmployeeModule,
    CategoryModule,
    DishModule,
    SetmealModule,
    ShopModule,
    AdminOrderModule,
  ],
})
export class AdminModule {}

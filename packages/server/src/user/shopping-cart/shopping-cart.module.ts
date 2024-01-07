import { Module } from '@nestjs/common'
import { ShoppingCartService } from './shopping-cart.service'
import { ShoppingCartController } from './shopping-cart.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShoppingCart } from './entities/shopping-cart.entity'
import { Dish } from 'src/admin/dish/entities/dish.entity'
import { Setmeal } from 'src/admin/setmeal/entities/setmeal.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingCart, Dish, Setmeal])
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class UserShoppingCartModule {}

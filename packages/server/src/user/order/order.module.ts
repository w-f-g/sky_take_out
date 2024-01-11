import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order, OrderDetail } from './entities/order.entity'
import { AddressBook } from '../address-book/entities/address-book.entity'
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order, OrderDetail,
      AddressBook, ShoppingCart,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class UserOrderModule {}

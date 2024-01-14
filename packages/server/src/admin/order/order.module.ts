import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order, OrderDetail } from 'src/user/order/entities/order.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AdminOrderModule {}

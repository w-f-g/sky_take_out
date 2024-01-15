import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/user/order/entities/order.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [TaskService]
})
export class TaskModule {}

import { Module } from '@nestjs/common'
import { WorkspaceService } from './workspace.service'
import { WorkspaceController } from './workspace.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/user/order/entities/order.entity'
import { User } from 'src/user/user/entities/user.entity'
import { Setmeal } from '../setmeal/entities/setmeal.entity'
import { Dish } from '../dish/entities/dish.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Setmeal, Dish])
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}

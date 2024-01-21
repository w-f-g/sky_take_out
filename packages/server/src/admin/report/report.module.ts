import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/user/order/entities/order.entity'
import { User } from 'src/user/user/entities/user.entity'
import { WorkspaceService } from '../workspace/workspace.service'
import { Setmeal } from '../setmeal/entities/setmeal.entity'
import { Dish } from '../dish/entities/dish.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Setmeal, Dish]),
  ],
  controllers: [ReportController],
  providers: [ReportService, WorkspaceService],
})
export class ReportModule {}

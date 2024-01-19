import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/user/order/entities/order.entity'
import { User } from 'src/user/user/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}

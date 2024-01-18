import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/user/order/entities/order.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}

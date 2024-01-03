import { Module } from '@nestjs/common'
import { SetmealService } from './setmeal.service'
import { SetmealController } from './setmeal.controller'

@Module({
  controllers: [SetmealController],
  providers: [SetmealService],
})
export class UserSetmealModule {}

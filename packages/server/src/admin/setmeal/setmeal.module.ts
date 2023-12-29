import { Module } from '@nestjs/common'
import { SetmealService } from './setmeal.service'
import { SetmealController } from './setmeal.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Setmeal, SetmealDish } from './entities/setmeal.entity'
import { Dish } from 'src/admin/dish/entities/dish.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Setmeal, SetmealDish, Dish])
  ],
  controllers: [SetmealController],
  providers: [SetmealService],
})
export class SetmealModule {}

import { Module } from '@nestjs/common'
import { DishService } from './dish.service'
import { DishController } from './dish.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dish, DishFlavor } from './entities/dish.entity'
import { SetmealDish } from 'src/setmeal/entities/setmeal.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Dish, DishFlavor, SetmealDish]),
  ],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}

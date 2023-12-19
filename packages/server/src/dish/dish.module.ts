import { Module } from '@nestjs/common'
import { DishService } from './dish.service'
import { DishController } from './dish.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dish, DishFlavor } from './entities/dish.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Dish, DishFlavor]),
  ],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}

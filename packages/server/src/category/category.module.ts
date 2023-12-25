import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Dish } from 'src/dish/entities/dish.entity'
import { Setmeal } from 'src/setmeal/entities/setmeal.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Dish, Setmeal])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

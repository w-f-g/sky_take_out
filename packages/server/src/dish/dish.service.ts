import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Dish, DishFlavor } from './entities/dish.entity'
import { Repository } from 'typeorm'
import { AddDishDTO } from './dto/dish.dto'
import { buildEntity } from 'src/utils'

@Injectable()
export class DishService {
  @InjectRepository(Dish)
  private dishRepository: Repository<Dish>

  @InjectRepository(DishFlavor)
  private dishFlavorRepository: Repository<DishFlavor>

  async addDish(data: AddDishDTO) {
    const dish = buildEntity(Dish, data)
    // 向菜品表插入一条数据
    const res = await this.dishRepository.insert(dish)
    const dishId: number = res.identifiers[0].id
    // 向口味表插入数据
    const flavors = data.flavors.map(f => {
      return buildEntity(DishFlavor, {
        ...f,
        dishId,
      })
    })
    await this.dishFlavorRepository.insert(flavors)
  }
}

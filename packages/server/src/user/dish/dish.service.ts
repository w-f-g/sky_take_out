import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IDishFlavor } from '@sky_take_out/types'
import { Dish, DishFlavor } from 'src/admin/dish/entities/dish.entity'
import { DishVO } from 'src/admin/dish/vo/dish.vo'
import { buildEntity } from 'src/utils'
import { StatusConstant } from 'src/utils/constant'
import { Repository } from 'typeorm'

@Injectable()
export class DishService {
  @InjectRepository(Dish)
  private dishRepository: Repository<Dish>

  @InjectRepository(DishFlavor)
  private dishFlavorRepository: Repository<DishFlavor>

  private async findDishFlavor(dishId: number) {
    const dishFlavor = await this.dishFlavorRepository.createQueryBuilder()
      .select([
        'id',
        'dish_id as dishId',
        'name',
        'value',
      ])
      .where({
        dishId,
      })
      .getRawMany<IDishFlavor>()
    return dishFlavor
  }

  /** C端-根据分类id查询菜品 service */
  async list(categoryId: number): Promise<DishVO[]> {
    // 查询相关菜品
    const dishs: Record<string, any>[] = await this.dishRepository.findBy({
      categoryId,
      status: StatusConstant.ENABLE,
    })
    const dishFlavorsPromise = dishs.map(d => this.findDishFlavor(d.id))
    // 查询相关菜品的口味
    const dishFlavors = await Promise.all(dishFlavorsPromise)
    // 组合数据
    return dishs.map((d, i) => {
      return buildEntity(DishVO, {
        ...d,
        flavors: dishFlavors[i]
      })
    })
  }
}

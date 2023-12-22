import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Dish, DishFlavor } from './entities/dish.entity'
import { FindOptionsWhere, Like, Repository } from 'typeorm'
import { AddDishDTO, DishPageQueryDTO } from './dto/dish.dto'
import { buildEntity, isEmpty } from 'src/utils'
import { DishPageResult, DishPageVO } from './vo/dish.vo'

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
    if (flavors.length > 0) {
      await this.dishFlavorRepository.insert(flavors)
    }
  }

  async getDishPage(query: DishPageQueryDTO): Promise<DishPageResult> {
    const _p = +query.page
    const _ps = +query.pageSize

    const where: FindOptionsWhere<Dish> = {}
    const { name, categoryId, status } = query
    if (!isEmpty(name)) {
      where['name'] = Like(`%${name}%`)
    }
    if (!isEmpty(categoryId)) {
      where['categoryId'] = Number(categoryId)
    }
    if (!isEmpty(status)){
      where['status'] = status
    }

    const queryBuilder = this.dishRepository.createQueryBuilder('dish')
      .leftJoinAndSelect('dish.category', 'category')
      .select([
        'dish.id as id',
        'dish.name as name',
        'dish.price as price',
        'dish.image as image',
        'dish.status as status',
        'dish.description as description',
        'dish.updateTime as updateTime',
        'category.name as categoryName',
      ])
      .where(where)
      .take(_ps)
      .skip((_p - 1) * _ps)
      .orderBy('dish.createTime', 'DESC')
    const [data, total] = await Promise.all([
      queryBuilder.getRawMany<DishPageVO>(),
      queryBuilder.getCount()
    ])
    return {
      total,
      records: data
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Dish, DishFlavor } from './entities/dish.entity'
import { FindOptionsWhere, In, Like, Repository } from 'typeorm'
import { AddDishDTO, DishDTO, DishFlavorDTO, DishPageQueryDTO } from './dto/dish.dto'
import { buildEntity, isEmpty } from 'src/utils'
import { DishPageResult, DishPageVO, DishVO } from './vo/dish.vo'
import { MessageConstant, StatusConstant } from 'src/utils/constant'
import { IDishFlavor } from '@sky_take_out/types'

@Injectable()
export class DishService {
  @InjectRepository(Dish)
  private dishRepository: Repository<Dish>

  @InjectRepository(DishFlavor)
  private dishFlavorRepository: Repository<DishFlavor>

  /** 向口味表插入数据 */
  private async insertDishFlavor(dishFlavors: DishFlavorDTO[], dishId: number) {
    const flavors = dishFlavors.map(f => {
      return buildEntity(DishFlavor, {
        ...f,
        dishId,
        id: null,
      })
    })
    if (flavors.length > 0) {
      await this.dishFlavorRepository.insert(flavors)
    }
  }

  /** 新增菜品 service */
  async addDish(data: AddDishDTO) {
    const dish = buildEntity(Dish, data)
    // 向菜品表插入一条数据
    const res = await this.dishRepository.insert(dish)
    const dishId: number = res.identifiers[0].id
    // 向口味表插入数据
    await this.insertDishFlavor(data.flavors, dishId)
  }

  /** 菜品分页查询 service */
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

  /** 批量删除菜品 service */
  async deleteDishs(ids: number[]) {
    const options = ids.map(x => ({ id: x }))
    const dishs = await this.dishRepository.findBy(options)
    // 避免传入不存在的数据
    const nodata = ids.filter(x => !dishs.some(y => Number(y.id) === x))
    if (nodata.length > 0){
      throw new HttpException(`删除失败id: ${nodata}不存在`, HttpStatus.FORBIDDEN)
    }

    // 起售中的菜品不能删除
    const flag = dishs.some(d => d.status === StatusConstant.ENABLE)
    if (flag) {
      throw new HttpException(MessageConstant.DISH_ON_SALE, HttpStatus.FORBIDDEN)
    }
    // TODO 被套餐关联的菜品不能删除

    // 删除菜品
    await this.dishRepository.delete(ids)
    // 删除菜品关联的口味数据
    await this.dishFlavorRepository.delete({
      dishId: In(ids),
    })
  }

  /** 根据id查询菜品 service */
  async getDishById(id: number): Promise<DishVO> {
    const dish: Record<string, any> = await this.dishRepository.findOneBy({ id })

    const res = buildEntity(DishVO, dish)

    const dishFlavor = await this.dishFlavorRepository.createQueryBuilder()
      .select([
        'id',
        'dish_id as dishId',
        'name',
        'value',
      ])
      .where({
        dishId: id,
      })
      .getRawMany<IDishFlavor>()
    res.flavors = dishFlavor

    return res
  }

  /** 修改菜品 service */
  async editDish(dish: DishDTO) {
    const _dish = buildEntity(Dish, dish)
    const dishId = _dish.id
    try {
      const res = await this.dishRepository.update(dishId, _dish)
      if (res.affected === 0) {
        throw new Error(`更新失败id: ${dishId} 记录不存在`)
      }
      await this.dishFlavorRepository.delete({
        dishId,
      })
      await this.insertDishFlavor(dish.flavors, dishId)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  /** 根据分类id查询菜品 service */
  async getDishByCategoryId(categoryId: number) {
    const res = await this.dishRepository.findBy({ categoryId })
    return res
  }

  /** 菜品起售、停售 service */
  async changeDishStatus(id: number, status: StatusConstant) {
    const dish = buildEntity(Dish, {
      status,
    })
    try {
      const res = await this.dishRepository.update(id, dish)
      if (res.affected === 0) {
        throw new Error(`更新失败id: ${id} 记录不存在`)
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }
}

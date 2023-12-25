import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Setmeal, SetmealDish } from './entities/setmeal.entity'
import { Repository } from 'typeorm'
import { SetmealVO } from './vo/setmeal.vo'
import { buildEntity } from 'src/utils'
import { ISetmealDish } from '@sky_take_out/types'
import { SetmealAddDTO, SetmealDishAdd } from './dto/setmeal.dto'

@Injectable()
export class SetmealService {
  @InjectRepository(Setmeal)
  private setmealRepository: Repository<Setmeal>

  @InjectRepository(SetmealDish)
  private setmealDishRepository: Repository<SetmealDish>

  private async insertSetmealDish(setmealId: number, setmealDishes: SetmealDishAdd[]) {
    const data = setmealDishes.map(s => {
      return {
        ...s,
        id: null,
        setmealId,
      }
    })
    if (data.length > 0) {
      await this.setmealDishRepository.insert(data)
    }
  }

  /** 新增套餐 service */
  async addSetmeal(data: SetmealAddDTO) {
    const setmeal = buildEntity(Setmeal, data)

    const res = await this.setmealRepository.insert(setmeal)
    const setmealId = res.identifiers[0].id
    await this.insertSetmealDish(setmealId, data.setmealDishes)
  }
  
  /** 根据id查询套餐 service */
  async getSetmealById(id: number): Promise<SetmealVO> {
    const setmeal: Record<string, any> = await this.setmealRepository.findOneBy({
      id,
    })
    const res = buildEntity(SetmealVO, setmeal)

    const setmealDishes = await this.setmealDishRepository.createQueryBuilder()
      .select([
        'id', 'name',
        'setmeal_id as setmealId', 'dish_id as dishId',
        'price', 'copies',
      ])
      .where({
        setmealId: id,
      })
      .getRawMany<ISetmealDish>()
    res.setmealDishes = setmealDishes
    return res
  }
}

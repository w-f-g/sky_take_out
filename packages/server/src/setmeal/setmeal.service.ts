import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Setmeal, SetmealDish } from './entities/setmeal.entity'
import { In, Repository } from 'typeorm'
import { SetmealVO } from './vo/setmeal.vo'
import { buildEntity } from 'src/utils'
import { ISetmealDish } from '@sky_take_out/types'
import { SetmealAddDTO, SetmealDTO, SetmealDishAdd } from './dto/setmeal.dto'
import { MessageConstant, StatusConstant } from 'src/utils/constant'
import { Dish } from 'src/dish/entities/dish.entity'

@Injectable()
export class SetmealService {
  @InjectRepository(Setmeal)
  private setmealRepository: Repository<Setmeal>

  @InjectRepository(SetmealDish)
  private setmealDishRepository: Repository<SetmealDish>

  @InjectRepository(Dish)
  private dishRepository: Repository<Dish>

  private async insertSetmealDish(setmealId: number, setmealDishes: SetmealDishAdd[]) {
    const data = setmealDishes.map(s => {
      return buildEntity(SetmealDish, {
        ...s,
        id: null,
        setmealId,
      })
    })
    if (data.length > 0) {
      await this.setmealDishRepository.insert(data)
    }
  }

  /** 修改套餐 service */
  async editSetmeal(data: SetmealDTO) {
    const setmeal = buildEntity(Setmeal, data)
    const setmealId = setmeal.id

    try {
      // 修改套餐
      const res = await this.setmealRepository.update(setmealId, setmeal)  
      if (res.affected === 0) {
        throw new Error(`更新失败id: ${setmealId} 记录不存在`)
      }
      // 删除套餐和菜品的关联关系
      await this.setmealDishRepository.delete({
        setmealId,
      })
      // 重新插入套餐和菜品的关联关系
      await this.insertSetmealDish(setmealId, data.setmealDishes)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  async changeSetmealStatus(id: number, status: StatusConstant) {
    if (status === StatusConstant.ENABLE) {
      // 起售套餐时，如果套餐内包含停售的菜品，则不能起售
      const query = this.dishRepository.query(
        'SELECT dish.* FROM dish LEFT JOIN setmeal_dish sDish ON dish.id = sDish.dish_id where sDish.setmeal_id = ?',
        [id]
      )
      // const queryBuilder = this.dishRepository.createQueryBuilder('dish')
      //   .leftJoinAndSelect('dish.setmealDish', 'setmealDish')
      //   .select(['dish.*'])
      //   .where('setmealDish.setmeal_id = :setmealId', { setmealId: id })

      const dishs: Dish[] = await query
      if (dishs && dishs.length > 0) {
        const flag = dishs.some(d => d.status === StatusConstant.DISABLE)
        if (flag) {
          throw new HttpException(MessageConstant.SETMEAL_ENABLE_FAILED, HttpStatus.FORBIDDEN)
        }
      }
    }
    // 修改套餐状态
    const setmeal = buildEntity(Setmeal, {
      status,
    })
    try {
      const res = await this.setmealRepository.update(id, setmeal)
      if (res.affected === 0) {
        throw new Error(`更新失败id: ${id} 记录不存在`)
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  /** 新增套餐 service */
  async addSetmeal(data: SetmealAddDTO) {
    const setmeal = buildEntity(Setmeal, data)

    const res = await this.setmealRepository.insert(setmeal)
    const setmealId = res.identifiers[0].id
    await this.insertSetmealDish(setmealId, data.setmealDishes)
  }

  /** 批量删除套餐 service */
  async deleteSetmealByIds(ids: number[]) {
    const options = ids.map(id => ({ id }))
    const setmeals = await this.setmealRepository.findBy(options)

    // 避免传入不存在的数据
    const nodata = ids.filter(x => !setmeals.some(y => Number(y.id) === x))
    if (nodata.length > 0){
      throw new HttpException(`删除失败id: ${nodata}不存在`, HttpStatus.FORBIDDEN)
    }

    // 起售中的套餐不能删除
    const flag = setmeals.some(d => d.status === StatusConstant.ENABLE)
    if (flag) {
      throw new HttpException(MessageConstant.SETMEAL_ON_SALE, HttpStatus.FORBIDDEN)
    }

    // 删除菜单
    await this.setmealRepository.delete(ids)
    // 删除套餐菜品关系表中的数据
    await this.setmealDishRepository.delete({
      setmealId: In(ids),
    })
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

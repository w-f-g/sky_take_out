import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Setmeal, SetmealDish } from './entities/setmeal.entity'
import { In, Repository } from 'typeorm'
import { SetmealVO } from './vo/setmeal.vo'
import { buildEntity } from 'src/utils'
import { ISetmealDish } from '@sky_take_out/types'
import { SetmealAddDTO, SetmealDishAdd } from './dto/setmeal.dto'
import { MessageConstant, StatusConstant } from 'src/utils/constant'

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

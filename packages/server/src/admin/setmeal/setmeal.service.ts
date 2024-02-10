import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Setmeal, SetmealDish } from './entities/setmeal.entity'
import { In, Repository } from 'typeorm'
import { SetmealPageResult, SetmealVO } from './vo/setmeal.vo'
import { buildEntity, camelToSnake, isEmpty } from 'src/utils'
import { ISetmealDish, ISetmealPageVO } from '@sky_take_out/types'
import { SetmealAddDTO, SetmealDTO, SetmealDishAdd, SetmealPageQueryDTO } from './dto/setmeal.dto'
import { MessageConstant, StatusConstant } from 'src/utils/constant'
import { Dish } from 'src/admin/dish/entities/dish.entity'

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

  /** 分页查询 service */
  async getSetmealPageQuery(query: SetmealPageQueryDTO): Promise<SetmealPageResult> {
    const _ps = +query.pageSize
    const take = +query.page
    const skip = (take - 1) * _ps

    const querySqlMap = {
      categoryId: v => '= ' + v,
      name: v => `LIKE '%${v}%'`,
      status: v => '= ' + v,
    }

    let where = Object.keys(querySqlMap)
      .filter(k => {
        if (k === 'status') {
          return !isEmpty(query[k]) && query[k].toString() !== ''
        }
        return !isEmpty(query[k])
      })
      .map(k => {
        const value = query[k]
        return `s.${camelToSnake(k)} ${querySqlMap[k](value)}`
      })
      .join(' AND ')
    where = where !== '' ? `WHERE ${where}` : ''

    const sql = `
      SELECT
        s.id, s.category_id as categoryId, s.name,
        s.price, s.status, s.description,
        s.image, DATE_FORMAT(s.update_time, '%Y-%m-%d %H:%i:%s') as updateTime, c.name as categoryName
      FROM setmeal s
      LEFT JOIN category c
      ON s.category_id = c.id
      ${where}
      LIMIT ${skip}, ${_ps}
    `
    const totalSql = `
      SELECT COUNT(0) as count
      FROM setmeal s
      LEFT JOIN category c
      ON s.category_id = c.id
      ${where}
    `
    const pagesQuery: Promise<ISetmealPageVO[]> = this.setmealRepository.query(sql)
    const totalQuery = this.setmealRepository.query(totalSql)
    const [records, total] = await Promise.all([pagesQuery, totalQuery])
    return {
      records: records.map(x => {
        return {
          ...x,
          price: Number(x.price),
        }
      }),
      total: total[0].count,
    }
  }

  /** 套餐起售、停售 service */
  async changeSetmealStatus(id: number, status: StatusConstant) {
    if (status === StatusConstant.ENABLE) {
      // 起售套餐时，如果套餐内包含停售的菜品，则不能起售
      const query = this.dishRepository.query(
        'SELECT dish.* FROM dish LEFT JOIN setmeal_dish sDish ON dish.id = sDish.dish_id where sDish.setmeal_id = ?',
        [id]
      )

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
    try {
      const res = await this.setmealRepository.insert(setmeal)
      const setmealId = res.identifiers[0].id
      await this.insertSetmealDish(setmealId, data.setmealDishes)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
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

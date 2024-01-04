import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Setmeal, SetmealDish } from 'src/admin/setmeal/entities/setmeal.entity'
import { StatusConstant } from 'src/utils/constant'
import { Repository } from 'typeorm'
import { UserSetmealDishVO } from './vo/setmeal.vo'

@Injectable()
export class SetmealService {
  @InjectRepository(Setmeal)
  private setmealRepository: Repository<Setmeal>

  @InjectRepository(SetmealDish)
  private setmealDishRepository: Repository<SetmealDish>

  /** C端-根据分类id查询套餐 service */
  async list(categoryId: number) {
    const res = await this.setmealRepository.findBy({
      categoryId,
      status: StatusConstant.ENABLE,
    })
    return res
  }

  /** C端-根据套餐id查询包含的菜品 service */
  async getDishBySetmealId(setmealId: number): Promise<UserSetmealDishVO[]> {
    const res: UserSetmealDishVO[] = await this.setmealDishRepository.query(
      `
        SELECT sd.name, sd.copies, d.image, d.description
        FROM setmeal_dish sd LEFT JOIN dish d
        ON sd.dish_id = d.id
        WHERE sd.setmeal_id = ?
      `,
      [setmealId]
    )
    return res
  }
}

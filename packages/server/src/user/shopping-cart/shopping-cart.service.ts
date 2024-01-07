import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ShoppingCart } from './entities/shopping-cart.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ShoppingCartDTO } from './dto/shopping-cart.dto'
import { ClsService, InjectCls } from 'nestjs-cls'
import { buildEntity, isEmpty } from 'src/utils'
import { Dish } from 'src/admin/dish/entities/dish.entity'
import { Setmeal } from 'src/admin/setmeal/entities/setmeal.entity'

@Injectable()
export class ShoppingCartService {
  @InjectRepository(ShoppingCart)
  private shoppingCartRepository: Repository<ShoppingCart>
  
  @InjectRepository(Dish)
  private dishRepository: Repository<Dish>
  
  @InjectRepository(Setmeal)
  private setmealRepository: Repository<Setmeal>

  @InjectCls()
  private clsService: ClsService

  async list() {
    const user = this.clsService.get('user')
    const userId = user.userId

    const list = await this.shoppingCartRepository.findBy({
      userId,
    })
    return list
  }

  async add(data: ShoppingCartDTO) {
    const user = this.clsService.get('user')
    const userId = user.userId
    const where: FindOptionsWhere<ShoppingCart> = {
      userId: user.userId,
    }
    const shoppingCart = buildEntity(ShoppingCart, {
      ...data,
      userId,
    })
    const isSetmeal = !isEmpty(data.setmealId)
    if (isSetmeal) {
      where.setmealId = data.setmealId
    } else {
      where.dishId = data.dishId
    }
    // 判断是否存在购物车数据
    const cart = await this.shoppingCartRepository.findOneBy(where)
    if (cart) {
      // 如果存在则只修改数量
      await this.shoppingCartRepository.update(cart.id, {
        number: cart.number + 1,
      })
      return
    }
    // 添加的是套餐
    if (isSetmeal) {
      const setmeal = await this.setmealRepository.findOneBy({ id: data.setmealId })
      shoppingCart.name = setmeal.name
      shoppingCart.image = setmeal.image
      shoppingCart.amount = setmeal.price
    } else {
      const dish = await this.dishRepository.findOneBy({ id: data.dishId })
      shoppingCart.name = dish.name
      shoppingCart.image = dish.image
      shoppingCart.amount = dish.price
    }
    shoppingCart.number = 1
    shoppingCart.createTime = new Date()
    // 添加购物车
    await this.shoppingCartRepository.insert(shoppingCart)
  }
}

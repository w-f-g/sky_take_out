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

  /** 查看购物车 service */
  async list() {
    const user = this.clsService.get('user')
    const userId = user.userId

    const list = await this.shoppingCartRepository.findBy({
      userId,
    })
    return list
  }

  /** 添加购物车 service */
  async add(data: ShoppingCartDTO) {
    const user = this.clsService.get('user')
    const userId = user.userId
    const where: FindOptionsWhere<ShoppingCart> = {
      userId,
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

  /** 清空购物车 service */
  async clean() {
    const user = this.clsService.get('user')
    const userId = user.userId

    await this.shoppingCartRepository.delete({ userId })
  }

  /** 删除购物车中一个商品 service */
  async sub(data: ShoppingCartDTO) {
    const user = this.clsService.get('user')
    const userId = user.userId
    const where: FindOptionsWhere<ShoppingCart> = {
      userId,
    }
    const isSetmeal = !isEmpty(data.setmealId)
    if (isSetmeal) {
      where.setmealId = data.setmealId
    } else {
      where.dishId = data.dishId
    }
    // 判断是否存在购物车数据
    const cart = await this.shoppingCartRepository.findOneBy(where)
    const number = cart.number
    // 如果只有 1 份就直接删除该商品
    if (number === 1) {
      await this.shoppingCartRepository.delete({
        id: cart.id,
      })
    } else {
      // 否则就减 1
      const shoppingCart = buildEntity(ShoppingCart, {
        ...data,
        userId,
        number: number - 1,
      })
      await this.shoppingCartRepository.update(cart.id, shoppingCart)
    }
  }
}

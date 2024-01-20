import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from 'src/user/order/entities/order.entity'
import { User } from 'src/user/user/entities/user.entity'
import { Between, MoreThan, Repository } from 'typeorm'
import { BusinessDataVO, OrderOverViewVO, OverViewVO } from './vo/workspace.vo'
import { dateFormat } from '@sky_take_out/utils'
import { OrderStatus, StatusConstant } from 'src/utils/constant'
import { Setmeal } from '../setmeal/entities/setmeal.entity'
import { Dish } from '../dish/entities/dish.entity'

@Injectable()
export class WorkspaceService {
  @InjectRepository(Order)
  private orderRepository: Repository<Order>

  @InjectRepository(User)
  private userRepository: Repository<User>

  @InjectRepository(Setmeal)
  private setmealRepository: Repository<Setmeal>

  @InjectRepository(Dish)
  private dishRepository: Repository<Dish>

  /** 查询今日运营数据 service */
  async getBusinessData(): Promise<BusinessDataVO> {
    /**
     * 营业额：当日已完成订单的总金额
     * 有效订单：当日已完成订单的数量
     * 订单完成率：有效订单数 / 总订单数
     * 平均客单价：营业额 / 有效订单数
     * 新增用户：当日新增用户的数量
     */
    const today = dateFormat(new Date(), 'YYYY-MM-DD')
    const beginTime = `${today} 00:00:00`
    const endTime = `${today} 23:59:59`
    const timeWhere = Between(beginTime, endTime)

    const orderQueryBuilder = this.orderRepository.createQueryBuilder()
      .select([
        'SUM(amount) as amount',
        'COUNT(0) as count',
      ])
    const validOrdersPromise = orderQueryBuilder.where({
      orderTime: timeWhere,
      status: OrderStatus.COMPLETED,
    }).getRawOne<Record<'amount' | 'count', number>>()
    const ordersPromise = orderQueryBuilder.where({
      orderTime: timeWhere,
    }).getRawOne<Record<'amount' | 'count', number>>()
    
    const usersQueryPromise = this.userRepository.createQueryBuilder()
      .select(['COUNT(0) as count'])
      .where({
        createTime: timeWhere,
      })
      .getRawOne<Record<'count', number>>()
    const [validOrders, orders, users] = await Promise.all([validOrdersPromise, ordersPromise, usersQueryPromise])
    return {
      newUsers: users.count,
      orderCompletionRate: validOrders.count / orders.count,
      turnover: validOrders.amount,
      unitPrice: validOrders.amount / validOrders.count,
      validOrderCount: validOrders.count,
    }
  }

  /** 查询套餐总览 service */
  async getOverviewSetmeals(): Promise<OverViewVO> {
    const query = await this.setmealRepository.createQueryBuilder()
      .select([
        'status',
        'COUNT(0) as count',
      ])
      .groupBy('status')
      .getRawMany()
    const sold = query.find(x => x.status === StatusConstant.ENABLE)
    const discontinued = query.find(x => x.status === StatusConstant.DISABLE)
    return {
      discontinued: discontinued ? discontinued.count : 0,
      sold: sold ? sold.count : 0,
    }
  }

  /** 查询菜品总览 service */
  async getOverviewDishes(): Promise<OverViewVO> {
    const query = await this.dishRepository.createQueryBuilder()
      .select([
        'status',
        'COUNT(0) as count',
      ])
      .groupBy('status')
      .getRawMany()
    const sold = query.find(x => x.status === StatusConstant.ENABLE)
    const discontinued = query.find(x => x.status === StatusConstant.DISABLE)
    return {
      discontinued: discontinued ? discontinued.count : 0,
      sold: sold ? sold.count : 0,
    }
  }

  /** 查询订单管理数据 service */
  async getOverviewOrders(): Promise<OrderOverViewVO> {
    const today = dateFormat(new Date(), 'YYYY-MM-DD')
    const beginTime = `${today} 00:00:00`

    const query = await this.orderRepository.createQueryBuilder()
      .select([
        'status',
        'COUNT(0) as count',
      ])
      .where({
        orderTime: MoreThan(beginTime),
      })
      .groupBy('status')
      .getRawMany()
    const map = query.reduce<Record<OrderStatus, number>>((prev, x) => {
      prev[x.status] = x.count
      return prev
    }, {} as any)
    const allOrders = query.reduce<number>((prev, x) => {
      return +x.count + prev
    }, 0)
    return {
      allOrders,
      cancelledOrders: map[OrderStatus.CANCELLED] || 0,
      completedOrders: map[OrderStatus.COMPLETED] || 0,
      deliveredOrders: map[OrderStatus.CONFIRMED] || 0,
      waitingOrders: map[OrderStatus.TO_BE_CONFIRMED] || 0,
    }
  }
}

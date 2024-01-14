import { Injectable } from '@nestjs/common'
import { AdminSearchOrderDTO } from './dto/order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Order, OrderDetail } from 'src/user/order/entities/order.entity'
import { Between, FindOptionsWhere, Repository } from 'typeorm'
import { isEmpty } from 'class-validator'
import { AdminOrderStatisticsVO, AdminOrderVO, AdminSearchOrderPageResult, AdminSearchOrderVO } from './vo/order.vo'
import { buildEntity } from 'src/utils'
import { OrderStatus } from 'src/utils/constant'

type OrderStatisticsQuery = {
  status: OrderStatus,
  count: number
}

const OrderStatistics = {
  /** 待接单数量 */
  [OrderStatus.TO_BE_CONFIRMED]: 'toBeConfirmed',
  /** 待派送数量 */
  [OrderStatus.CONFIRMED]: 'confirmed',
  /** 派送中数量 */
  [OrderStatus.DELIVERY_IN_PROGRESS]: 'deliveryInProgress',
} as const

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private orderRepository: Repository<Order>

  @InjectRepository(OrderDetail)
  private orderDetailRepository: Repository<OrderDetail>
  
  /** 订单搜索 service */
  async searchOrder(query: AdminSearchOrderDTO): Promise<AdminSearchOrderPageResult> {
    const _p = +query.page
    const _ps = +query.pageSize
    const where: FindOptionsWhere<Order> = {}

    const { beginTime, endTime, number, phone, status } = query
    if (!isEmpty(status) && status.toString() !== '') {
      where.status = Number(status)
    }
    if (!isEmpty(phone)) {
      where.phone = phone
    }
    if (!isEmpty(number)) {
      where.number = number
    }
    if (!isEmpty(beginTime) || !isEmpty(endTime)) {
      where.orderTime = Between(beginTime, endTime)
    }
    const [orders, total] = await this.orderRepository.findAndCount({
      take: _ps,
      skip: (_p - 1) * _ps,
      where,
    })

    const records: AdminSearchOrderVO[] = []
    const orderDetails = orders.map(o => this.orderDetailRepository.findBy({ orderId: o.id}))
    let index = 0
    for await (const orderDetail of orderDetails) {
      const order = buildEntity(AdminSearchOrderVO, {
        ...orders[index],
        orderDishes: orderDetail.map(x => `${x.name}*${x.number};`).join(),
      })
      records.push(order)
      index++
    }

    return {
      records,
      total,
    }
  }
  
  /** 各个状态的订单数量统计 service */
  async getOrderStatistics(): Promise<AdminOrderStatisticsVO> {
    const query: OrderStatisticsQuery[] = await this.orderRepository.createQueryBuilder()
      .select([
        'status',
        'COUNT(0) as count',
      ])
      .groupBy('status')
      .getRawMany()
    const res = query
      .filter(x => x.status > 1 && x.status < 5)
      .reduce<AdminOrderStatisticsVO>((prev, item) => {
        const key = OrderStatistics[item.status]
        prev[key] = +item.count
        return prev
      }, {} as AdminOrderStatisticsVO)
    return res
  }

  /** 查询订单详情 service */
  async getOrderDetailsById(id: number): Promise<AdminOrderVO> {
    const orderQuery = await this.orderRepository.findOneBy({ id })
    const orderDetailList = await this.orderDetailRepository.findBy({ orderId: orderQuery.id })
    const order = buildEntity(AdminOrderVO, {
      ...orderQuery,
      orderDetailList,
      orderDishes: orderDetailList.map(x => `${x.name}*${x.number};`).join(),
    })
    return order
  }

  /** 接单 service */
  async confirmOrder(id: number) {
    const order = buildEntity(Order, {
      status: OrderStatus.CONFIRMED
    })
    await this.orderRepository.update(id, order)
  }
}

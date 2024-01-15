import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from 'src/user/order/entities/order.entity'
import { buildEntity } from 'src/utils'
import { OrderStatus } from 'src/utils/constant'
import { LessThan, Repository } from 'typeorm'

@Injectable()
export class TaskService {
  @InjectRepository(Order)
  private orderRepository: Repository<Order>
  
  /** 处理超时订单 */
  @Cron(CronExpression.EVERY_MINUTE)
  async processTimeoutOrder() {
    const date = new Date()
    date.setMinutes(date.getMinutes() - 15)
    const orderList = await this.getOrderList(OrderStatus.PENDING_PAYMENT, date)
    if (orderList !== null && orderList.length > 0) {
      const newOrderList = orderList.map(o => {
        const order = buildEntity(Order, {
          ...o,
          status: OrderStatus.CANCELLED,
          cancelReason: '订单超时，自动取消',
          cancelTime: new Date(),
        })
        return this.orderRepository.update(o.id, order)
      })
      await Promise.all(newOrderList)
    }
  }

  /** 处理一直处于派送中状态的订单 */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async processDeliveryOrder() {
    const date = new Date()
    date.setMinutes(date.getMinutes() - 60)
    const orderList = await this.getOrderList(OrderStatus.DELIVERY_IN_PROGRESS, date)
    if (orderList !== null && orderList.length > 0) {
      const newOrderList = orderList.map(o => {
        const order = buildEntity(Order, {
          ...o,
          status: OrderStatus.COMPLETED,
        })
        return this.orderRepository.update(o.id, order)
      })
      await Promise.all(newOrderList)
    }

  }

  private async getOrderList(status: OrderStatus, time: Date | string) {
    const orderList = await this.orderRepository.findBy({
      status,
      orderTime: LessThan(time),
    })
    return orderList
  }
}

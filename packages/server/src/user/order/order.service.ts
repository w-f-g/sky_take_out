import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { HistoryOrdersVO, OrderSubmitVO, OrderVO } from './vo/order.vo'
import { HistoryOrdersDTO, OrderPaymentDTO, OrderSubmitDTO } from './dto/order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Order, OrderDetail } from './entities/order.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { AddressBook } from '../address-book/entities/address-book.entity'
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity'
import { buildEntity, isEmpty } from 'src/utils'
import { MessageConstant, OrderStatus, PayStatus } from 'src/utils/constant'
import { ClsService, InjectCls } from 'nestjs-cls'
import { dateFormat } from '@sky_take_out/utils'
import { WebsocketGateway } from 'src/websocket/websocket.gateway'

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private orderRepository: Repository<Order>

  @InjectRepository(OrderDetail)
  private orderDetailRepository: Repository<OrderDetail>
  
  @InjectRepository(AddressBook)
  private addressBookRepository: Repository<AddressBook>

  @InjectRepository(ShoppingCart)
  private shoppingCartRepository: Repository<ShoppingCart>
  
  @InjectCls()
  private clsService: ClsService

  @Inject(WebsocketGateway)
  private webscoketGateway: WebsocketGateway

  private getUserId() {
    const user = this.clsService.get('user')
    return user.userId
  }

  /** 用户下单 service */
  async submitOrder(data: OrderSubmitDTO): Promise<OrderSubmitVO> {
    // 处理各种业务异常（地址簿为空、购物车数据为空）
    const addressBook = await this.addressBookRepository.findOneBy({ id: data.addressBookId })
    if (isEmpty(addressBook)) {
      throw new HttpException(MessageConstant.ADDRESS_BOOK_IS_NULL, HttpStatus.FORBIDDEN)
    }
    const userId = this.getUserId()
    const shoppingCart = await this.shoppingCartRepository.findBy({ userId })
    if (isEmpty(shoppingCart) || shoppingCart.length === 0) {
      throw new HttpException(MessageConstant.SHOPPING_CART_IS_NULL, HttpStatus.FORBIDDEN)
    }
    // 向订单表插入 1 条数据
    const order = buildEntity(Order, {
      ...data,
      orderTime: new Date(),
      payStatus: PayStatus.UN_PAID,
      status: OrderStatus.PENDING_PAYMENT,
      number: Date.now(),
      phone: addressBook.phone,
      consignee: addressBook.consignee,
      userId,
    })
    await this.orderRepository.insert(order)
    // 向订单明细表插入 n 条数据
    const orderDetails = shoppingCart.map(s => {
      return buildEntity(OrderDetail, {
        ...s,
        orderId: order.id,
      })
    })
    await this.orderDetailRepository.insert(orderDetails)
    // 清空当前用户的购物车数据
    await this.shoppingCartRepository.delete({ userId })
    return {
      id: order.id,
      orderTime: dateFormat(order.orderTime),
      orderAmount: order.amount,
      orderNumber: order.number,
    }
  }

  /** 订单支付 service */
  async paySuccess(data: OrderPaymentDTO) {
    const o = await this.orderRepository.findOneBy({ number: data.orderNumber })
    const order = buildEntity(Order, {
      id: o.id,
      status: OrderStatus.TO_BE_CONFIRMED,
      payStatus: PayStatus.PAID,
      checkoutTime: new Date(),
    })
    await this.orderRepository.update(o.id, order)

    // 通过 websocket 向管理端推送消息
    const map = {
      type: 1,
      orderId: o.id,
      content: `订单号：${o.number}`,
    }
    this.webscoketGateway.emitAllClient(map)
  }

  /** 历史订单查询 service */
  async historyOrders({ page, pageSize, status }: HistoryOrdersDTO): Promise<HistoryOrdersVO> {
    const _p = +page
    const _ps = +pageSize
    const userId = this.getUserId()
    const where: FindOptionsWhere<Order> = { userId }
    if (!isEmpty(status) && status.toString() !== '') {
      where.status = status
    }
    const [orders, total] = await this.orderRepository.findAndCount({
      take: _ps,
      skip: (_p - 1) * _ps,
      where,
    })

    const records: OrderVO[] = []
    const orderDetails = orders.map(o => this.orderDetailRepository.findBy({ orderId: o.id}))
    let index = 0
    for await (const orderDetail of orderDetails) {
      const order = buildEntity(OrderVO, {
        ...orders[index],
        orderDetailList: orderDetail,
      })
      records.push(order)
      index++
    }
    return {
      records,
      total,
    }
  }

  /** 查询订单详情 service */
  async getOrdereDetailById(id: number) {
    const userId = this.getUserId()
    const orderQuery = this.orderRepository.findOneBy({ id, userId })
    const orderDetailListQuery = this.orderDetailRepository.findBy({ orderId: id })

    const [order, orderDetailList] = await Promise.all([orderQuery, orderDetailListQuery])
    return buildEntity(OrderVO, {
      ...order,
      orderDetailList,
    })
  }

  /** 取消订单 service */
  async cancelOrder(id: number) {
    const userId = this.getUserId()
    const orderQuery = await this.orderRepository.findOneBy({ id, userId })
    // 商家已接单状态下，用户取消订单需电话沟通商家
    // 派送中状态下，用户取消订单需电话沟通商家
    if (orderQuery.status > 2) {
      throw new HttpException(MessageConstant.ORDER_STATUS_ERROR, HttpStatus.FORBIDDEN)
    } 
    // 待支付和待接单状态下，用户可直接取消订单
    const order = new Order()
    // 如果在待接单状态下取消订单，需要给用户退款
    if (orderQuery.status === OrderStatus.TO_BE_CONFIRMED) {
      // 调用微信接口进行退款（略）
      order.payStatus = PayStatus.REFUND
    }
    // 取消订单后需要将订单状态修改为“已取消”
    order.status = OrderStatus.CANCELLED
    order.cancelReason = '用户取消'
    order.cancelTime = new Date()
    await this.orderRepository.update({ id, userId }, order)
  }

  /** 再来一单 service */
  async repetitionOrder(id: number) {
    const userId = this.getUserId()
    const orderDetailList = await this.orderDetailRepository.findBy({ orderId: id })
    const shoppingCarts = orderDetailList.map(od => {
      return buildEntity(ShoppingCart, {
        ...od,
        userId,
        id: null,
        createTime: new Date(),
      })
    })
    await this.shoppingCartRepository.insert(shoppingCarts)
  }
  
  /** 催单 service */
  async reminderOrder(id: number) {
    const userId = this.getUserId()
    const orderQuery = await this.orderRepository.findOneBy({ id, userId })
    if (isEmpty(orderQuery)) {
      throw new HttpException(MessageConstant.ORDER_STATUS_ERROR, HttpStatus.FORBIDDEN)
    }
    const map = {
      type: 2,
      orderId: id,
      content: `订单号：${orderQuery.number}`,
    }
    this.webscoketGateway.emitAllClient(map)
  }
}

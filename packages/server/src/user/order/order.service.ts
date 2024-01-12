import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { OrderSubmitVO } from './vo/order.vo'
import { OrderPaymentDTO, OrderSubmitDTO } from './dto/order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Order, OrderDetail } from './entities/order.entity'
import { Repository } from 'typeorm'
import { AddressBook } from '../address-book/entities/address-book.entity'
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity'
import { buildEntity, isEmpty } from 'src/utils'
import { MessageConstant, OrderStatus, PayStatus } from 'src/utils/constant'
import { ClsService, InjectCls } from 'nestjs-cls'
import { dateFormat } from '@sky_take_out/utils'

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

  async paySuccess(data: OrderPaymentDTO) {
    const o = await this.orderRepository.findOneBy({ number: data.orderNumber })
    const order = buildEntity(Order, {
      id: o.id,
      status: OrderStatus.TO_BE_CONFIRMED,
      payStatus: PayStatus.PAID,
      checkoutTime: new Date(),
    })
    await this.orderRepository.update(o.id, order)
  }
}

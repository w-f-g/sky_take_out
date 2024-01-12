import { IOrder, IOrderDetail } from '@sky_take_out/types'
import { dateFormat } from '@sky_take_out/utils'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('orders')
export class Order implements IOrder {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '主键',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'number',
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
    comment: '订单号',
    collation: 'utf8_bin',
  })
  number: string

  @Column({
    name: 'status',
    type: 'int',
    default: 1,
    comment: '订单状态 1待付款 2待接单 3已接单 4派送中 5已完成 6已取消 7退款',
  })
  status: number

  @Column({
    name: 'user_id',
    type: 'bigint',
    comment: '下单用户',
  })
  userId: number

  @Column({
    name: 'address_book_id',
    type: 'bigint',
    comment: '地址id',
  })
  addressBookId: number

  @Column({
    name: 'order_time',
    type: 'datetime',
    comment: '下单时间',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => dateFormat(value),
    },
  })
  orderTime: Date | string

  @Column({
    name: 'checkout_time',
    type: 'datetime',
    nullable: true,
    default: null,
    comment: '结账时间',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => dateFormat(value),
    },
  })
  checkoutTime: Date | string

  @Column({
    name: 'pay_method',
    type: 'int',
    default: 1,
    comment: '支付方式 1微信,2支付宝',
  })
  payMethod: number

  @Column({
    name: 'pay_status',
    type: 'tinyint',
    default: 0,
    comment: '支付状态 0未支付 1已支付 2退款',
  })
  payStatus: number

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '实收金额',
    transformer: {
      to: v => v,
      from: v => Number(v),
    },
  })
  amount: number

  @Column({
    name: 'remark',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
    comment: '备注',
  })
  remark: string

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 11,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
    comment: '手机号',
  })
  phone: string

  @Column({
    name: 'address',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
    comment: '地址',
  })
  address: string

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 32,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
    comment: '用户名称',
  })
  userName: string

  @Column({
    name: 'consignee',
    type: 'varchar',
    length: 32,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
    comment: '收货人',
  })
  consignee: string

  @Column({
    name: 'cancel_reason',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
    comment: '订单取消原因',
  })
  cancelReason: string

  @Column({
    name: 'reject_reason',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
    comment: '订单拒绝原因',
  })
  rejectionReason: string

  @Column({
    name: 'cancel_time',
    type: 'datetime',
    nullable: true,
    default: null,
    comment: '订单取消时间',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => dateFormat(value),
    },
  })
  cancelTime: Date | string

  @Column({
    name: 'estimated_delivery_time',
    type: 'datetime',
    nullable: true,
    default: null,
    comment: '预计送达时间',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => dateFormat(value),
    },
  })
  estimatedDeliveryTime: Date | string
  
  @Column({
    name: 'delivery_status',
    type: 'boolean',
    transformer: {
      to: v => v,
      from: v => Number(v),
    },
    comment: '配送状态  1立即送出  0选择具体时间',
  })
  deliveryStatus: number
  
  @Column({
    name: 'delivery_time',
    type: 'datetime',
    nullable: true,
    default: null,
    comment: '送达时间',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => dateFormat(value),
    },
  })
  deliveryTime: Date | string

  @Column({
    name: 'pack_amount',
    type: 'int',
    nullable: true,
    default: null,
    comment: '打包费',
  })
  packAmount: number

  @Column({
    name: 'tableware_number',
    type: 'int',
    nullable: true,
    default: null,
    comment: '餐具数量',
  })
  tablewareNumber: number

  @Column({
    name: 'taleware_status',
    type: 'boolean',
    default: 1,
    transformer: {
      to: v => v,
      from: v => Number(v),
    },
    comment: '餐具数量状态  1按餐量提供  0选择具体数量',
  })
  tablewareStatus: number
}

@Entity('order_detail')
export class OrderDetail implements IOrderDetail {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '主键',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'name',
    type: 'varchar',
    length: 32,
    nullable: true,
    default: null,
    comment: '名字',
    collation: 'utf8_bin',
  })
  name: string

  @Column({
    name: 'image',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    comment: '图片',
    collation: 'utf8_bin',
  })
  image: string

  @Column({
    name: 'order_id',
    type: 'bigint',
    comment: '订单id',
  })
  orderId: number

  @Column({
    name: 'dish_id',
    type: 'bigint',
    nullable: true,
    default: null,
    comment: '菜品id',
  })
  dishId: number

  @Column({
    name: 'setmeal_id',
    type: 'bigint',
    nullable: true,
    default: null,
    comment: '套餐id',
  })
  setmealId: number

  @Column({
    name: 'dish_flavor',
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
    comment: '口味',
    collation: 'utf8_bin',
  })
  dishFlavor: string

  @Column({
    name: 'number',
    type: 'int',
    default: 1,
    comment: '数量',
  })
  number: number

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '金额',
    transformer: {
      to: v => v,
      from: v => Number(v),
    },
  })
  amount: number
}
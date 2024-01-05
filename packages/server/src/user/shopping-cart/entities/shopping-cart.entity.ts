import { IShoppingCartEntity } from '@sky_take_out/types'
import { dateFormat } from '@sky_take_out/utils'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shopping_cart')
export class ShoppingCart implements IShoppingCartEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '主键',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'name',
    comment: '商品名称',
    type: 'varchar',
    length: 32,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
  })
  name: string

  @Column({
    name: 'image',
    comment: '图片',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
  })
  image: string

  @Column({
    name: 'user_id',
    comment: '主键',
    type: 'bigint',
  })
  userId: number

  @Column({
    name: 'dish_id',
    comment: '菜品id',
    type: 'bigint',
    nullable: true,
    default: null,
  })
  dishId: number

  @Column({
    name: 'setmeal_id',
    comment: '套餐id',
    type: 'bigint',
    nullable: true,
    default: null,
  })
  setmealId: number

  @Column({
    name: 'dish_flavor',
    comment: '口味',
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
    collation: 'utf8_bin',
  })
  dishFlavor: string

  @Column({
    name: 'number',
    comment: '数量',
    type: 'int',
    default: 1,
  })
  number: number

  @Column({
    name: 'amount',
    comment: '金额',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: v => v,
      from: v => Number(v),
    },
  })
  amount: number
  
  @Column({
    name: 'create_time',
    type: 'datetime',
    comment: '创建时间',
    default: null,
    nullable: true,
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => dateFormat(value),
    },
  })
  createTime: Date
}
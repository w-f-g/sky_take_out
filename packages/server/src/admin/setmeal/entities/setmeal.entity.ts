import { ISetmealDishEntity, ISetmealEntity } from '@sky_take_out/types'
import { CommonEntity } from 'src/common/entities/common.entity'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('setmeal')
@Index('idx_setmeal_name', ['name'], { unique: true })
export class Setmeal extends CommonEntity implements ISetmealEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '主键',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'category_id',
    type: 'bigint',
    comment: '菜品分类id',
  })
  categoryId: number

  @Column({
    name: 'name',
    type: 'varchar',
    length: 32,
    comment: '套餐名称',
    collation: 'utf8_bin',
  })
  name: string

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '套餐价格',
    transformer: {
      to: v => v,
      from: v => Number(v),
    },
  })
  price: number

  @Column({
    name: 'status',
    type: 'int',
    default: 1,
    comment: '售卖状态 0:停售 1:起售',
  })
  status: number

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    comment: '描述信息',
    collation: 'utf8_bin',
    nullable: true,
    default: null,
  })
  description: string

  @Column({
    name: 'image',
    type: 'varchar',
    length: 255,
    comment: '图片',
    collation: 'utf8_bin',
    nullable: true,
    default: null,
  })
  image: string
}

@Entity('setmeal_dish')
export class SetmealDish extends CommonEntity implements ISetmealDishEntity {  
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '主键',
    type: 'bigint',
  })
  id: number
  
  @Column({
    name: 'setmeal_id',
    type: 'bigint',
    nullable: true,
    default: null,
    comment: '套餐id',
  })
  setmealId: number
  
  @Column({
    name: 'dish_id',
    type: 'bigint',
    nullable: true,
    default: null,
    comment: '菜品id',
  })
  dishId: number
  
  @Column({
    name: 'name',
    type: 'varchar',
    length: 32,
    nullable: true,
    default: null,
    comment: '菜品名称 （冗余字段）',
    collation: 'utf8_bin',
  })
  name: string
  
  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: null,
    comment: '菜品单价（冗余字段）',
    transformer: {
      to: v => v,
      from: v => Number(v),
    },
  })
  price: number
  
  @Column({
    name: 'copies',
    type: 'int',
    nullable: true,
    default: null,
    comment: '菜品份数',
  })
  copies: number
}
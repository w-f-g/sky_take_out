import { IDishEntity, IDishFlavorEntity } from '@sky_take_out/types'
import { Category } from 'src/category/entities/category.entity'
import { CommonEntity } from 'src/common/entities/common.entity'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('dish')
@Index('idx_dish_name', ['name'], { unique: true })
export class Dish extends CommonEntity implements IDishEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    comment: '主键',
  })
  id: number

  @Column({
    name: 'name',
    type: 'varchar',
    length: 32,
    collation: 'utf8_bin',
    comment: '菜品名称',
  })
  name: string

  @Column({
    name: 'category_id',
    type: 'bigint',
    comment: '菜品分类id',
  })
  categoryId: number

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: null,
    comment: '菜品价格',
  })
  price: number

  @Column({
    name: 'image',
    type: 'varchar',
    length: 255,
    collation: 'utf8_bin',
    nullable: true,
    default: null,
    comment: '图片',
  })
  image: string

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    collation: 'utf8_bin',
    nullable: true,
    default: null,
    comment: '描述信息',
  })
  description: string

  @Column({
    name: 'status',
    type: 'int',
    default: 1,
    comment: '0 停售 1 起售',
  })
  status: number

  @JoinColumn({
    name: 'category_id',
  })
  @ManyToOne(() => Category, c => c.id, {
    cascade: false,
  })
  category: Category
}

@Entity('dish_flavor')
export class DishFlavor extends CommonEntity implements IDishFlavorEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    comment: '主键',
  })
  id: number

  @Column({
    name: 'dish_id',
    type: 'bigint',
    comment: '菜品',
  })
  dishId: number

  @Column({
    name: 'name',
    type: 'varchar',
    length: 32,
    comment: '口味名称',
    collation: 'utf8_bin',
    nullable: true,
    default: null,
  })
  name: string

  @Column({
    name: 'value',
    type: 'varchar',
    length: 255,
    comment: '口味数据list',
    collation: 'utf8_bin',
    nullable: true,
    default: null,
  })
  value: string
}
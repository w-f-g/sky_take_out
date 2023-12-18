import { ICategoryEntity } from '@sky_take_out/types'
import { CommonEntity } from 'src/common/entities/common.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('category')
export class Category extends CommonEntity implements ICategoryEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '主键',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'name',
    comment: '分类名称',
    type: 'varchar',
    length: 32,
    collation: 'utf8_bin',
  })
  name: string
  
  @Column({
    name: 'sort',
    comment: '顺序',
    type: 'int',
    default: 0,
  })
  sort: number
  
  @Column({
    name: 'status',
    comment: '分类状态 0:禁用，1:启用',
    type: 'int',
    nullable: true,
    default: null,
  })
  status: number
  
  @Column({
    name: 'type',
    comment: '类型   1 菜品分类 2 套餐分类',
    type: 'int',
    nullable: true,
    default: null,
  })
  type: number

  static build(data: Partial<Record<keyof Category, Category[keyof Category]>>): Category {
    const _c = new Category()
    Object.entries(data).forEach(([k, v]) => {
      _c[k] = v
    })
    return _c
  }
}
import { ICategoryEntity } from '@sky_take_out/types'
import { dateFormat } from '@sky_take_out/utils'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('category')
export class Category implements ICategoryEntity {
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
  
  @Column({
    name: 'create_user',
    type: 'bigint',
    comment: '创建人',
    default: null,
    nullable: true,
  })
  createUser: number
  
  @Column({
    name: 'update_time',
    type: 'datetime',
    comment: '更新时间',
    default: null,
    nullable: true,
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => dateFormat(value),
    },
  })
  updateTime: Date
  
  @Column({
    name: 'update_user',
    type: 'bigint',
    comment: '修改人',
    default: null,
    nullable: true,
  })
  updateUser: number
}
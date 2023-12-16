import { IEntityCommon } from '@sky_take_out/types'
import { dateFormat } from '@sky_take_out/utils'
import { BeforeInsert, BeforeUpdate, Column } from 'typeorm'

export class CommonEntity implements IEntityCommon {
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
    name: 'create_user',
    type: 'bigint',
    comment: '创建人',
    default: null,
    nullable: true,
  })
  createUser: number

  @Column({
    name: 'update_user',
    type: 'bigint',
    comment: '修改人',
    default: null,
    nullable: true,
  })
  updateUser: number

  @BeforeUpdate()
  handleBeforeUpdate() {
    console.log(new Date())
    this.updateTime = new Date()
  }

  @BeforeInsert()
  handleBeforeInsert() {
    const now = new Date()
    this.createTime = now
    this.updateTime = now
  }
}
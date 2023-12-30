import { IEntityCommon } from '@sky_take_out/types'
import { dateFormat } from '@sky_take_out/utils'
import { executionAsyncResource } from 'async_hooks'
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
    const id = this.getUserId()
    if (id !== null) {
      this.updateUser = id
    }
    this.updateTime = new Date()
  }

  @BeforeInsert()
  handleBeforeInsert() {
    const id = this.getUserId()
    if (id !== null) {
      this.createUser = id
      this.updateUser = id
    }
    const now = new Date()
    this.createTime = now
    this.updateTime = now
  }

  private getUserId() {
    const res = executionAsyncResource()
    const keys = Object.getOwnPropertySymbols(res)
    for (const k of keys) {
      const target = res[k]
      if (
        typeof target === 'object' &&
        typeof target.employee === 'object' &&
        target.employee.empId
      ) {
        return Number(target.employee.empId)
      }
    }
    return null
  }
}
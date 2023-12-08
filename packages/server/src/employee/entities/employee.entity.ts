import { IEmployeeInfo } from '@sky_take_out/types'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('employee')
export class Employee implements IEmployeeInfo {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '主键',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'name',
    comment: '姓名',
    type: 'varchar',
    collation: 'utf8_bin',
  })
  name: string

  @Column({
    name: 'username',
    type: 'varchar',
    comment: '用户名',
    collation: 'utf8_bin',
    unique: true,
  })
  username: string

  @Column({
    name: 'password',
    type: 'varchar',
    comment: '密码',
    collation: 'utf8_bin',
  })
  password: string

  @Column({
    name: 'phone',
    type: 'varchar',
    comment: '手机号',
    collation: 'utf8_bin',
  })
  phone: string

  @Column({
    name: 'sex',
    type: 'varchar',
    comment: '性别',
    collation: 'utf8_bin',
  })
  sex: string

  @Column({
    name: 'id_number',
    type: 'varchar',
    comment: '身份证号',
    collation: 'utf8_bin',
    unique: true,
  })
  idNumber: string

  @Column({
    name: 'status',
    type: 'int',
    comment: '状态 0:禁用，1:启用',
    default: 1,
  })
  status: number

  @Column({
    name: 'create_time',
    type: 'datetime',
    comment: '创建时间',
    default: null,
    nullable: true,
  })
  createTime: Date

  @Column({
    name: 'update_time',
    type: 'datetime',
    comment: '更新时间',
    default: null,
    nullable: true,

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
}
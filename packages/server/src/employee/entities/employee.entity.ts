import { IEmployeeInfo } from '@sky_take_out/types'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EmployeeDTO } from '../dto/employee.dto'
import { dateFormat } from '@sky_take_out/utils'

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
    length: 32,
    collation: 'utf8_bin',
  })
  name: string

  @Column({
    name: 'username',
    type: 'varchar',
    length: 32,
    comment: '用户名',
    collation: 'utf8_bin',
    unique: true,
  })
  username: string

  @Column({
    name: 'password',
    type: 'varchar',
    length: 64,
    comment: '密码',
    collation: 'utf8_bin',
  })
  password: string

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 11,
    comment: '手机号',
    collation: 'utf8_bin',
  })
  phone: string

  @Column({
    name: 'sex',
    type: 'varchar',
    length: 2,
    comment: '性别',
    collation: 'utf8_bin',
  })
  sex: string

  @Column({
    name: 'id_number',
    type: 'varchar',
    length: 18,
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
}

export function buildEmployee(
  employee: EmployeeDTO,
  status: number,
  password: string,
  createTime: Date,
  updateTime: Date,
  createUser: number,
  updateUser: number,
) {
  const _e = new Employee()
  _e.idNumber = employee.idNumber
  _e.name = employee.name
  _e.phone = employee.phone
  _e.sex = employee.sex
  _e.username = employee.username

  _e.status = status
  _e.password = password
  _e.createTime = createTime
  _e.updateTime = updateTime

  _e.createUser = createUser
  _e.updateUser = updateUser

  return _e
}
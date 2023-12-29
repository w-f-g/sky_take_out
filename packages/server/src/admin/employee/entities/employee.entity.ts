import { IEmployeeEntity } from '@sky_take_out/types'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from 'src/common/entities/common.entity'

@Entity('employee')
@Index('idx_username', ['username'], { unique: true })
export class Employee extends CommonEntity implements IEmployeeEntity {
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
}

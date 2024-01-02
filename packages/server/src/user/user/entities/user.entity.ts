import { IUserEntity } from '@sky_take_out/types'
import { dateFormat } from '@sky_take_out/utils'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User implements IUserEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    comment: '主键',
  })
  id: number
  
  @Column({
    name: 'openid',
    type: 'varchar',
    length: 45,
    default: null,
    nullable: true,
    collation: 'utf8_bin',
    comment: '微信用户唯一标识',
  })
  openid: string
  
  @Column({
    name: 'name',
    type: 'varchar',
    length: 32,
    default: null,
    nullable: true,
    collation: 'utf8_bin',
    comment: '姓名',
  })
  name: string
  
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 11,
    default: null,
    nullable: true,
    collation: 'utf8_bin',
    comment: '手机号',
  })
  phone: string
  
  @Column({
    name: 'sex',
    type: 'varchar',
    length: 2,
    default: null,
    nullable: true,
    collation: 'utf8_bin',
    comment: '性别',
  })
  sex: string
  
  @Column({
    name: 'id_number',
    type: 'varchar',
    length: 18,
    default: null,
    nullable: true,
    collation: 'utf8_bin',
    comment: '身份证号',
  })
  idNumber: string
  
  @Column({
    name: 'avatar',
    type: 'varchar',
    length: 500,
    default: null,
    nullable: true,
    collation: 'utf8_bin',
    comment: '头像',
  })
  avatar: string
  
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
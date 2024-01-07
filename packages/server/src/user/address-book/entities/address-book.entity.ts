import { IAddressBook } from '@sky_take_out/types'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('address_book')
export class AddressBook implements IAddressBook {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '主键',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'user_id',
    type: 'bigint',
    comment: '用户id',
  })
  userId: number

  @Column({
    name: 'consignee',
    type: 'varchar',
    length: 50,
    comment: '收货人',
    nullable: true,
    default: null,
    collation: 'utf8_bin',
  })
  consignee: string

  @Column({
    name: 'sex',
    type: 'varchar',
    length: 2,
    comment: '性别',
    nullable: true,
    default: null,
    collation: 'utf8_bin',
  })
  sex: string

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 11,
    comment: '手机号',
    collation: 'utf8_bin',
  })
  phone: string

  @Column({
    name: 'province_code',
    type: 'varchar',
    length: 12,
    comment: '省级区划编号',
    nullable: true,
    default: null,
    charset: 'utf8mb4',
  })
  provinceCode: string

  @Column({
    name: 'province_name',
    type: 'varchar',
    length: 32,
    comment: '省级名称',
    nullable: true,
    default: null,
    charset: 'utf8mb4',
  })
  provinceName: string

  @Column({
    name: 'city_code',
    type: 'varchar',
    length: 12,
    comment: '市级区划编号',
    nullable: true,
    default: null,
    charset: 'utf8mb4',
  })
  cityCode: string

  @Column({
    name: 'city_name',
    type: 'varchar',
    length: 32,
    comment: '市级名称',
    nullable: true,
    default: null,
    charset: 'utf8mb4',
  })
  cityName: string

  @Column({
    name: 'district_code',
    type: 'varchar',
    length: 12,
    comment: '区级区划编号',
    nullable: true,
    default: null,
    charset: 'utf8mb4',
  })
  districtCode: string

  @Column({
    name: 'district_name',
    type: 'varchar',
    length: 32,
    comment: '区级名称',
    nullable: true,
    default: null,
    charset: 'utf8mb4',
  })
  districtName: string

  @Column({
    name: 'detail',
    type: 'varchar',
    length: 200,
    comment: '详细地址',
    nullable: true,
    default: null,
    charset: 'utf8mb4',
  })
  detail: string

  @Column({
    name: 'label',
    type: 'varchar',
    length: 100,
    comment: '标签',
    nullable: true,
    default: null,
    charset: 'utf8mb4',
  })
  label: string

  @Column({
    name: 'isDefault',
    type: 'boolean',
    comment: '默认 0 否 1是',
    default: 0,
  })
  isDefault: number
}
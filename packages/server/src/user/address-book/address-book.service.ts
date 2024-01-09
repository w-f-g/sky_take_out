import { Injectable } from '@nestjs/common'
import { AddressBookDTO, EditAddressBookDTO } from './dto/address-book.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AddressBook } from './entities/address-book.entity'
import { Repository } from 'typeorm'
import { ClsService, InjectCls } from 'nestjs-cls'
import { buildEntity } from 'src/utils'

@Injectable()
export class AddressBookService {
  @InjectRepository(AddressBook)
  private addressBookRepository: Repository<AddressBook>

  @InjectCls()
  private clsService: ClsService

  private getUserId() {
    const user = this.clsService.get('user')
    return user.userId
  }

  /** 新增地址 service */
  async addAddress(data: AddressBookDTO) {
    const userId = this.getUserId()

    const addressBook = buildEntity(AddressBook, data)
    addressBook.userId = userId
    addressBook.isDefault = 0

    await this.addressBookRepository.insert(addressBook)
  }

  /** 查询当前登录用户的所有地址信息 service */
  async getAddressList() {
    const userId = this.getUserId()
    const res = await this.addressBookRepository.findBy({ userId })
    return res
  }

  /** 查询默认地址 service */
  async getDefaultAddress() {
    const userId = this.getUserId()
    const res = await this.addressBookRepository.findOneBy({
      userId,
      isDefault: 1,
    })
    return res
  }

  /** 根据id修改地址 service */
  async editAddress(data: EditAddressBookDTO) {
    const userId = this.getUserId()

    const addressBook = buildEntity(AddressBook, data)
    addressBook.userId = userId

    await this.addressBookRepository.update({ id: data.id }, addressBook)
  }

  /** 根据id删除地址 service */
  async deleteAddressById(id: number) {
    const userId = this.getUserId()
    await this.addressBookRepository.delete({
      id,
      userId,
    })
  }

  /** 根据id查询地址 service */
  async getAddressById(id: number) {
    const userId = this.getUserId()
    const res = await this.addressBookRepository.findOneBy({
      id,
      userId,
    })
    return res
  }

  /** 设置默认地址 service */
  async setDefaultAddress(id: number) {
    const userId = this.getUserId()
    const address = buildEntity(AddressBook, {
      userId,
      isDefault: 0,
    })
    await this.addressBookRepository.update({ userId }, address)

    address.isDefault = 1
    await this.addressBookRepository.update({ id, userId }, address)
  }
}

import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common'
import { AddressBookService } from './address-book.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import R from 'src/utils/response'

@ApiBearerAuth('bearer')
@ApiTags('C端-地址簿接口')
@UseGuards(UserAuthGuard)
@Controller('/user/addressBook')
export class AddressBookController {
  constructor(private readonly addressBookService: AddressBookService) {}

  @Post()
  async addAddress() {
    return R.success(null)
  }

  @Get('/list')
  async getAddressList() {
    return R.success([])
  }

  @Get('/default')
  async getDefaultAddress() {
    return R.success(null)
  }

  @Put()
  async editAddress() {
    return R.success(null)
  }

  @Delete()
  async deleteAddress() {
    return R.success(null)
  }

  @Get('/:id')
  async getAddressById() {
    return R.success(null)
  }

  @Put('/defalut')
  async setDefaultAddress() {
    return R.success(null)
  }
}

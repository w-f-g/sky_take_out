import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AddressBookService } from './address-book.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import R from 'src/utils/response'
import { AddressBookDTO } from './dto/address-book.dto'
import { AddressBookVO } from './vo/address-book.vo'

@ApiBearerAuth('bearer')
@ApiTags('C端-地址簿接口')
@UseGuards(UserAuthGuard)
@Controller('/user/addressBook')
export class AddressBookController {
  constructor(private readonly addressBookService: AddressBookService) {}

  @ApiOperation({ summary: '新增地址' })
  @Post()
  async addAddress(@Body() data: AddressBookDTO) {
    await this.addressBookService.addAddress(data)
    return R.success(null)
  }

  @ApiOkResponse({ type: [AddressBookVO] })
  @ApiOperation({ summary: '查询当前登录用户的所有地址信息' })
  @Get('/list')
  async getAddressList(): Promise<R<AddressBookVO[]>> {
    const list = await this.addressBookService.getAddressList()
    return R.success(list)
  }

  @ApiOkResponse({ type: AddressBookVO })
  @ApiOperation({ summary: '查询默认地址' })
  @Get('/default')
  async getDefaultAddress(): Promise<R<AddressBookVO>> {
    const address = await this.addressBookService.getDefaultAddress()
    return R.success(address)
  }

  @ApiOperation({ summary: '根据id修改地址' })
  @Put()
  async editAddress() {
    return R.success(null)
  }

  @ApiOperation({ summary: '根据id删除地址' })
  @Delete()
  async deleteAddress(@Query('id', new ParseIntPipe()) id: number) {
    await this.addressBookService.deleteAddressById(id)
    return R.success(null)
  }

  @ApiOkResponse({ type: AddressBookVO })
  @ApiOperation({ summary: '根据id查询地址' })
  @Get('/:id')
  async getAddressById(@Param('id', new ParseIntPipe()) id: number) {
    const address = await this.addressBookService.getAddressById(id)
    return R.success(address)
  }

  @ApiOperation({ summary: '设置默认地址' })
  @Put('/defalut')
  async setDefaultAddress(@Body('id', new ParseIntPipe()) id: number) {
    return R.success(null)
  }
}

import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common'
import { ShoppingCartService } from './shopping-cart.service'
import R from 'src/utils/response'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import { ShoppingCartDTO } from './dto/shopping-cart.dto'
import { ShoppingCartVO } from './vo/shopping-cart.vo'

@ApiTags('C端-购物车接口')
@UseGuards(UserAuthGuard)
@Controller('/user/shoppingCart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOkResponse({ type: [ShoppingCartVO] })
  @ApiOperation({ summary: '查看购物车' })
  @Get('/list')
  async list() {
    const list = await this.shoppingCartService.list()
    return R.success(list)
  }

  @ApiOperation({ summary: '删除购物车中一个商品' })
  @Post('/sub')
  async sub(@Body() data: ShoppingCartDTO) {
    await this.shoppingCartService.sub(data)
    return R.success(null)
  }

  @ApiOperation({ summary: '添加购物车' })
  @Post('/add')
  async add(@Body() data: ShoppingCartDTO) {
    await this.shoppingCartService.add(data)
    return R.success(null)
  }

  @ApiOperation({ summary: '清空购物车' })
  @Delete('/clean')
  async clean() {
    await this.shoppingCartService.clean()
    return R.success(null)
  }
}

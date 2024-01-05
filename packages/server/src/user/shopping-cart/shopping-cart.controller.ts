import { Controller, Delete, Get } from '@nestjs/common'
import { ShoppingCartService } from './shopping-cart.service'
import R from 'src/utils/response'

@Controller('/user/shoppingCart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get('/list')
  async list() {
    return R.success(null)
  }

  @Delete('/clean')
  async clean() {
    return R.success(null)
  }
}

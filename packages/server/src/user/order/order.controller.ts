import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import R from 'src/utils/response'
import { OrderSubmitDTO } from './dto/order.dto'
import { OrderSubmitVO } from './vo/order.vo'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'

@ApiBearerAuth('bearer')
@ApiTags('C端-订单接口')
@UseGuards(UserAuthGuard)
@Controller('/user/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '催单' })
  @Get('/reminder/:id')
  async reminderOrder(@Param('id', new ParseIntPipe()) id: number) {
    return R.success(null)
  }

  @ApiOperation({ summary: '再来一单' })
  @Post('/repetition/:id')
  async repetitionOrder(@Param('id', new ParseIntPipe()) id: number) {
    return R.success(null)
  }

  @ApiOperation({ summary: '历史订单查询' })
  @Get('/historyOrders')
  async historyOrders() {
    return R.success([])
  }

  @ApiOperation({ summary: '取消订单' })
  @Put('/cancel/:id')
  async cancelOrder(@Param('id', new ParseIntPipe()) id: number) {
    return R.success(null)
  }

  @ApiOperation({ summary: '查询订单详情' })
  @Get('/orderDetail/:id')
  async getOrdereDetailById(@Param('id', new ParseIntPipe()) id: number) {
    return R.success(null)
  }

  @ApiOkResponse({ type: OrderSubmitVO })
  @ApiOperation({ summary: '用户下单' })
  @Post('/submit')
  async submitOrder(@Body() data: OrderSubmitDTO): Promise<R<OrderSubmitVO>> {
    const res = await this.orderService.submitOrder(data)
    return R.success(res)
  }

  @ApiOperation({ summary: '订单支付' })
  @Put('/payment')
  async paymentOrder() {
    return R.success(null)
  }
}

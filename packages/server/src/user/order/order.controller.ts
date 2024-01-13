import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import R from 'src/utils/response'
import { HistoryOrdersDTO, OrderPaymentDTO, OrderSubmitDTO } from './dto/order.dto'
import { OrderSubmitVO } from './vo/order.vo'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/auth/UserAuth.guard'
import { isEmpty } from 'src/utils'
import { OrderStatus } from 'src/utils/constant'

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
  async historyOrders(@Query() query: HistoryOrdersDTO) {
    if (!isEmpty(query.status) && query.status.toString() !== '') {
      const _status = Number(query.status)
      if (!(_status in OrderStatus)) {
        throw new HttpException('status must be one of the following values: 1, 2, 3, 4, 5, 6', HttpStatus.FORBIDDEN)
      }
    }
    const res = await this.orderService.historyOrders(query)
    return R.success(res)
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
  async paymentOrder(@Body() data: OrderPaymentDTO) {
    // TODO: 个人暂时没有开通微信商家支付的需求，所以这里只模拟支付成功的情况
    await this.orderService.paySuccess(data)
    return R.success(null)
  }
}

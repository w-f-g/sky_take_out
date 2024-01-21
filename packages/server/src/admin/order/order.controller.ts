import { Body, Controller, Get, Param, ParseIntPipe, Put, Query, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AdminAuthGuard } from 'src/auth/AdminAuth.guard'
import R from 'src/utils/response'
import { AdminCancelOrderDTO, AdminConfirmOrderDTO, AdminRejectionOrderDTO, AdminSearchOrderDTO } from './dto/order.dto'
import { AdminOrderStatisticsVO, AdminOrderVO, AdminSearchOrderPageResult } from './vo/order.vo'

@ApiTags('订单管理接口')
@UseGuards(AdminAuthGuard)
@Controller('/admin/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '取消订单' })
  @Put('/cancel')
  async cancelOrder(@Body() data: AdminCancelOrderDTO) {
    await this.orderService.cancelOrder(data)
    return R.success(null)
  }

  @ApiOkResponse({ type: AdminOrderStatisticsVO })
  @ApiOperation({ summary: '各个状态的订单数量统计' })
  @Get('/statistics')
  async getOrderStatistics() {
    const res = await this.orderService.getOrderStatistics()
    return R.success(res)
  }

  @ApiOperation({ summary: '完成订单' })
  @Put('/complete/:id')
  async completeOrder(@Param('id', new ParseIntPipe()) id: number) {
    await this.orderService.completeOrder(id)
    return R.success(null)
  }

  @ApiOperation({ summary: '拒单' })
  @Put('/rejection')
  async rejectionOrder(@Body() data: AdminRejectionOrderDTO) {
    await this.orderService.rejectionOrder(data)
    return R.success(null)
  }

  @ApiOperation({ summary: '接单' })
  @Put('/confirm')
  async confirmOrder(@Body() data: AdminConfirmOrderDTO) {
    await this.orderService.confirmOrder(data.id)
    return R.success(null)
  }

  @ApiOkResponse({ type: AdminOrderVO })
  @ApiOperation({ summary: '查询订单详情' })
  @Get('/details/:id')
  async getOrderDetailsById(@Param('id', new ParseIntPipe()) id: number) {
    const res = await this.orderService.getOrderDetailsById(id)
    return R.success(res)
  }

  @ApiOperation({ summary: '派送订单' })
  @Put('/delivery/:id')
  async deliveryOrder(@Param('id', new ParseIntPipe()) id: number) {
    await this.orderService.deliveryOrder(id)
    return R.success(null)
  }

  @ApiOkResponse({ type: AdminSearchOrderPageResult })
  @ApiOperation({ summary: '订单搜索' })
  @Get('/conditionSearch')
  async searchOrder(@Query() query: AdminSearchOrderDTO) {
    const res = await this.orderService.searchOrder(query)
    return R.success(res)
  }
}

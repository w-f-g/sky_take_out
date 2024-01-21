import { Controller, Get, UseGuards } from '@nestjs/common'
import { WorkspaceService } from './workspace.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AdminAuthGuard } from 'src/auth/AdminAuth.guard'
import R from 'src/utils/response'
import { BusinessDataVO, OrderOverViewVO, OverViewVO } from './vo/workspace.vo'
import { dateFormat } from '@sky_take_out/utils'

@ApiTags('数据统计相关接口')
@UseGuards(AdminAuthGuard)
@Controller('/admin/workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @ApiOkResponse({ type: BusinessDataVO })
  @ApiOperation({ summary: '查询今日运营数据' })
  @Get('/businessData')
  async getBusinessData() {
    const today = dateFormat(new Date(), 'YYYY-MM-DD')
    const beginTime = `${today} 00:00:00`
    const endTime = `${today} 23:59:59`
    // 有点慢
    const res = await this.workspaceService.getBusinessData(beginTime, endTime)
    return R.success(res)
  }

  @ApiOkResponse({ type: OverViewVO })
  @ApiOperation({ summary: '查询套餐总览' })
  @Get('/overviewSetmeals')
  async getOverviewSetmeals() {
    const res = await this.workspaceService.getOverviewSetmeals()
    return R.success(res)
  }

  @ApiOkResponse({ type: OverViewVO })
  @ApiOperation({ summary: '查询菜品总览' })
  @Get('/overviewDishes')
  async getOverviewDishes() {
    const res = await this.workspaceService.getOverviewDishes()
    return R.success(res)
  }

  @ApiOkResponse({ type: OrderOverViewVO })
  @ApiOperation({ summary: '查询订单管理数据' })
  @Get('/overviewOrders')
  async getOverviewOrders() {
    const res = await this.workspaceService.getOverviewOrders()
    return R.success(res)
  }
}

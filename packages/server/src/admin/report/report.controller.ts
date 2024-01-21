import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common'
import { ReportService } from './report.service'
import R from 'src/utils/response'
import { ReportDTO } from './dto/report.dto'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AdminAuthGuard } from 'src/auth/AdminAuth.guard'
import { OrdersStatisticsVO, SalesTop10ReportVO, TurnoverStatisticsVO, UserStatisticsVO } from './vo/report.vo'
import { Response } from 'express'

@ApiBearerAuth('bearer')
@ApiTags('数据统计相关接口')
@UseGuards(AdminAuthGuard)
@Controller('/admin/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOkResponse({ type: Buffer })
  @ApiOperation({ summary: '导出Excel报表接口' })
  @Get('/export')
  async exportReportExcel(@Res() res: Response) {
    const file = await this.reportService.exportReportExcel()
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent('运营数据报表.xlsx')}`)
    res.send(file)
  }

  @ApiOkResponse({ type: SalesTop10ReportVO })
  @ApiOperation({ summary: '查询销量排名top10接口' })
  @Get('/top10')
  async getTop10Report(@Query() query: ReportDTO) {
    const res = await this.reportService.getTop10Report(query)
    return R.success(res)
  }

  @ApiOkResponse({ type: UserStatisticsVO })
  @ApiOperation({ summary: '用户统计接口' })
  @Get('/userStatistics')
  async getUserStatistics(@Query() query: ReportDTO) {
    const res = await this.reportService.getUserStatistics(query)
    return R.success(res)
  }

  @ApiOkResponse({ type: TurnoverStatisticsVO })
  @ApiOperation({ summary: '营业额统计接口' })
  @Get('/turnoverStatistics')
  async getTurnoverStatistics(@Query() query: ReportDTO) {
    const res = await this.reportService.getTurnoverStatistics(query)
    return R.success(res)
  }

  @ApiOkResponse({ type: OrdersStatisticsVO })
  @ApiOperation({ summary: '订单统计接口' })
  @Get('/ordersStatistics')
  async getOrdersStatistics(@Query() query: ReportDTO) {
    const res = await this.reportService.getOrdersStatistics(query)
    return R.success(res)
  }
}

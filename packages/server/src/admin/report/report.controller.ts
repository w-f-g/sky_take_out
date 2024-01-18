import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ReportService } from './report.service'
import R from 'src/utils/response'
import { ReportDTO } from './dto/report.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AdminAuthGuard } from 'src/auth/AdminAuth.guard'

@ApiBearerAuth('bearer')
@ApiTags('数据统计相关接口')
@UseGuards(AdminAuthGuard)
@Controller('/admin/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({ summary: '导出Excel报表接口' })
  @Get('/export')
  async exportReportExcel() {
    return R.success(null)
  }

  @ApiOperation({ summary: '查询销量排名top10接口' })
  @Get('/top10')
  async getTop10Report(@Query() query: ReportDTO) {
    return R.success(null)
  }

  @ApiOperation({ summary: '用户统计接口' })
  @Get('/userStatistics')
  async getUserStatistics(@Query() query: ReportDTO) {
    return R.success(null)
  }

  @ApiOperation({ summary: '营业额统计接口' })
  @Get('/turnoverStatistics')
  async getTurnoverStatistics(@Query() query: ReportDTO) {
    const res = await this.reportService.getTurnoverStatistics(query)
    return R.success(res)
  }

  @ApiOperation({ summary: '订单统计接口' })
  @Get('/ordersStatistics')
  async getOrdersStatistics(@Query() query: ReportDTO) {
    return R.success(null)
  }
}

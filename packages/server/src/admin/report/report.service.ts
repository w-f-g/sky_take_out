import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ReportDTO } from './dto/report.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from 'src/user/order/entities/order.entity'
import { Between, FindOptionsWhere, LessThan, Repository } from 'typeorm'
import { OrderStatus } from 'src/utils/constant'
import { OrdersStatisticsVO, SalesTop10ReportVO, TurnoverStatisticsVO, UserStatisticsVO } from './vo/report.vo'
import { dateAddFormat, dateFormat, dateSubtractFormat } from '@sky_take_out/utils'
import { isEmpty } from 'src/utils'
import { User } from 'src/user/user/entities/user.entity'
import { WorkspaceService } from '../workspace/workspace.service'
import { resolve } from 'path'
import { CellValue, Workbook } from 'exceljs'

type CountQuery = Record<'count', string>

const XLSX_TEMPLATE_PATH = resolve(process.cwd(), 'template/运营数据报表模板.xlsx')

@Injectable()
export class ReportService {
  @InjectRepository(Order)
  private orderRepository: Repository<Order>

  @InjectRepository(User)
  private userRepository: Repository<User>

  @Inject(WorkspaceService)
  private workspaceService: WorkspaceService

  private common(begin: string, end: string) {
    const beginDate = new Date(begin)
    const endDate = new Date(end)
    const diff = endDate.getTime() - beginDate.getTime()
    if (diff < 0) {
      throw new HttpException('参数错误，end时间小于begin', HttpStatus.FORBIDDEN)
    }

    // 计算天数
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
    // 生成日期
    const dateList = new Array(days).fill('').map((_, i) => {
      return dateAddFormat(beginDate, i)
    })
    return {
      dateList,
      beginDate,
      endDate,
    }
  }

  /** 营业额统计接口 service */
  async getTurnoverStatistics({ begin, end }: ReportDTO): Promise<TurnoverStatisticsVO> {
    const { dateList, beginDate, endDate } = this.common(begin, end)
    // 查询营业额
    const orders = await this.orderRepository.createQueryBuilder()
      .select([
        'DATE_FORMAT(order_time, "%Y-%m-%d") as orderTime',
        'SUM(amount) as turnover',
      ])
      .where({
        orderTime: Between(
          beginDate,
          begin === end ? dateAddFormat(endDate, 1) : endDate
        ),
        status: OrderStatus.COMPLETED,
      })
      .groupBy('orderTime')
      .getRawMany<Record<'orderTime' | 'turnover', string>>()
    
    const turnoverList = dateList.map(d => {
      const target = orders.find(o => o.orderTime === d)
      // 这天没有营业额
      if (isEmpty(target)) return '0'
      return target.turnover
    }).join()
    return {
      dateList: dateList.join(),
      turnoverList,
    }
  }

  /** 用户统计接口 service */
  async getUserStatistics({ begin, end }: ReportDTO): Promise<UserStatisticsVO> {
    const { dateList } = this.common(begin, end)
    const builder = this.userRepository.createQueryBuilder()
      .select([
        'COUNT(id) as count',
      ])

    const newUserList: string[] = []
    const totalUserList: string[] = []
    for (const d of dateList) {
      const beginTime = `${d} 00:00:00`
      const endTime = `${d} 23:59:59`
      //新增用户数量
      const todayUserQuery = builder.where({
        createTime: Between(beginTime, endTime),
      }).getRawOne<CountQuery>()
      // 总用户数量
      const allUserQuery = builder.where({
        createTime: LessThan(endTime),
      }).getRawOne<CountQuery>()
      const [todayUsers, allUsers] = await Promise.all([todayUserQuery, allUserQuery])
      newUserList.push(todayUsers.count)
      totalUserList.push(allUsers.count)
    }
    return{
      dateList: dateList.join(),
      newUserList: newUserList.join(),
      totalUserList: totalUserList.join(),
    }
  }

  /** 订单统计接口 service */
  async getOrdersStatistics({ begin, end }: ReportDTO): Promise<OrdersStatisticsVO> {
    const { dateList } = this.common(begin, end)
    const builder = this.orderRepository.createQueryBuilder()
      .select([
        'COUNT(id) as count',
      ])
    
    const orderCountList: string[] = []
    const validOrderCountList: string[] = []
    for (const d of dateList) {
      const beginTime = `${d} 00:00:00`
      const endTime = `${d} 23:59:59`
      const where: FindOptionsWhere<Order> = {
        orderTime: Between(beginTime, endTime),
      }

      const orderCountListQuery = builder.where(where).getRawOne<CountQuery>()
      const validOrderCountListQuery = builder.where({
        ...where,
        status: OrderStatus.COMPLETED,
      }).getRawOne<CountQuery>()
      const [_orderCount, _validOrderCount] = await Promise.all([orderCountListQuery, validOrderCountListQuery])
      orderCountList.push(_orderCount.count)
      validOrderCountList.push(_validOrderCount.count)
    }
    const totalOrderCount = orderCountList.reduce((prev, count) => +count + prev, 0)
    const validOrderCount = validOrderCountList.reduce((prev, count) => +count + prev, 0)
    return {
      totalOrderCount,
      validOrderCount,
      dateList: dateList.join(),
      orderCountList: orderCountList.join(),
      validOrderCountList: validOrderCountList.join(),
      orderCompletionRate: totalOrderCount !== 0 ? validOrderCount / totalOrderCount : 0,
    }
  }

  /** 查询销量排名top10接口 service */
  async getTop10Report({ begin, end }: ReportDTO): Promise<SalesTop10ReportVO> {
    const beginDate = new Date(begin)
    const endDate = new Date(end)
    const diff = endDate.getTime() - beginDate.getTime()
    if (diff < 0) {
      throw new HttpException('参数错误，end时间小于begin', HttpStatus.FORBIDDEN)
    }
    const beginTime = `${begin} 00:00:00`
    const endTime = `${end} 23:59:59`

    const query: Record<'name' | 'number', string>[] = await this.orderRepository.query(`
      SELECT od.name, SUM(od.number) number
      FROM order_detail od, orders o
      WHERE od.order_id = o.id AND o.status = 5
      AND o.order_time BETWEEN ? AND ?
      GROUP BY od.name
      ORDER BY number DESC
      LIMIT 0,10
    `, [beginTime, endTime])
    
    return {
      nameList: query.map(x => x.name).join(),
      numberList: query.map(x => x.number).join(),
    }
  }

  /** 导出Excel报表接口 service */
  async exportReportExcel() {
    const today = dateFormat(new Date(), 'YYYY-MM-DD')
    const beginDate = dateSubtractFormat(today, 30)
    const beginTime = `${beginDate} 00:00:00`
    const endTime = `${today} 23:59:59`
    const res = await this.workspaceService.getBusinessData(beginTime, endTime)

    const workbook = new Workbook()
    await workbook.xlsx.readFile(XLSX_TEMPLATE_PATH)
    const worksheet = workbook.getWorksheet('Sheet1')
    const setCell = (r: string | number, value: CellValue) => {
      const cell = worksheet.getCell(r)
      cell.value = value
      cell.model.style.alignment.horizontal = 'center'
    }
    
    setCell('B2', `时间：${beginTime}至${endTime}`)
    setCell('C4', res.turnover)
    setCell('E4', res.orderCompletionRate)
    setCell('G4', res.newUsers)
    setCell('C5', res.validOrderCount)
    setCell('E5', res.unitPrice)

    for (let i = 0; i < 30; i++) {
      const time = dateAddFormat(beginDate, i)
      const _beginTime = `${time} 00:00:00`
      const _endTime = `${time} 23:59:59`
      const _res = await this.workspaceService.getBusinessData(_beginTime, _endTime)
      const rowNumber = 8 + i
      setCell(`B${rowNumber}`, time)
      setCell(`C${rowNumber}`, _res.turnover)
      setCell(`D${rowNumber}`, _res.validOrderCount)
      setCell(`E${rowNumber}`, _res.orderCompletionRate)
      setCell(`F${rowNumber}`, _res.unitPrice)
      setCell(`G${rowNumber}`, _res.newUsers)
    }
    worksheet.eachRow((row, rowNumber) => {
      let height = 25
      if (rowNumber === 1) {
        height = 50
      }
      row.height = height
    })
    
    const file = workbook.xlsx.writeBuffer()
    return file
  }
}

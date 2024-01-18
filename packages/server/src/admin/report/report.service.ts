import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ReportDTO } from './dto/report.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from 'src/user/order/entities/order.entity'
import { Between, Repository } from 'typeorm'
import { OrderStatus } from 'src/utils/constant'
import { TurnoverStatisticsVO } from './vo/report.vo'
import { dateAddFormat } from '@sky_take_out/utils'
import { isEmpty } from 'src/utils'

@Injectable()
export class ReportService {
  @InjectRepository(Order)
  private orderRepository: Repository<Order>

  async getTurnoverStatistics({ begin, end }: ReportDTO): Promise<TurnoverStatisticsVO> {
    const beginDate = new Date(begin)
    const endDate = new Date(end)
    const diff = endDate.getTime() - beginDate.getTime()
    if (diff < 0) {
      throw new HttpException('参数错误，end时间小于begin', HttpStatus.FORBIDDEN)
    }
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
    
    // 计算天数
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
    // 生成日期
    const dateList = new Array(days).fill('').map((_, i) => {
      return dateAddFormat(beginDate, i)
    })
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
}

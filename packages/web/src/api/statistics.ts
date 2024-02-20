import request from '@/utils/request'
import type { IOrdersStatisticsVO, IResponse, ISalesTop10ReportVO, ITurnoverStatisticsVO, IUserStatisticsVO } from '@sky_take_out/types'

export const exportReport = async () => {
  const res: Blob = await request({
    url: '/admin/report/export',
    responseType: 'blob',
  })
  const url = URL.createObjectURL(res)
  const node = document.createElement('a')
  node.href = url
  node.download = '运营数据统计报表.xlsx'
  node.click()
}

export const getTop10 = async (begin: string, end: string) => {
  const res: IResponse<ISalesTop10ReportVO> = await request({
    url: '/admin/report/top10',
    params: {
      begin,
      end,
    },
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const getUserStatistics = async (begin: string, end: string) => {
  const res: IResponse<IUserStatisticsVO> = await request({
    url: '/admin/report/userStatistics',
    params: {
      begin,
      end,
    },
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const getTurnoverStatistics = async (begin: string, end: string) => {
  const res: IResponse<ITurnoverStatisticsVO> = await request({
    url: '/admin/report/turnoverStatistics',
    params: {
      begin,
      end,
    },
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const getOrdersStatistics = async (begin: string, end: string) => {
  const res: IResponse<IOrdersStatisticsVO> = await request({
    url: '/admin/report/ordersStatistics',
    params: {
      begin,
      end,
    },
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}
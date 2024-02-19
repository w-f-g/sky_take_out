import request from '@/utils/request'
import type { IAdminOrderStatisticsVO, IAdminOrderVO, IAdminSearchOrderDTO, IAdminSearchOrderVO, IPageResult, IResponse } from '@sky_take_out/types'

export const getOrderList = async (params: IAdminSearchOrderDTO) => {
  const res: IResponse<IPageResult<IAdminSearchOrderVO>> = await request({
    url: '/admin/order/conditionSearch',
    params,
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

/** 接单 */
export const confirmOrder = async (id: number) => {
  const res: IResponse = await request({
    url: '/admin/order/confirm',
    method: 'put',
    data: { id },
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

/** 派送订单 */
export const deliveryOrder = async (id: number) => {
  const res: IResponse = await request({
    url: '/admin/order/delivery/' + id,
    method: 'put',
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

/** 完成订单 */
export const completeOrder = async (id: number) => {
  const res: IResponse = await request({
    url: '/admin/order/complete/' + id,
    method: 'put',
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

/** 取消订单 */
export const cancelOrder = async (id: number, cancelReason: string) => {
  const res: IResponse = await request({
    url: '/admin/order/cancel',
    method: 'put',
    data: { id, cancelReason },
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

/** 拒单 */
export const rejectionOrder = async (id: number, rejectionReason: string) => {
  const res: IResponse = await request({
    url: '/admin/order/rejection',
    method: 'put',
    data: { id, rejectionReason },
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const orderStatistics = async () => {
  const res: IResponse<IAdminOrderStatisticsVO> = await request({
    url: '/admin/order/statistics',
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const getOrderInfoById = async (id: number) => {
  const res: IResponse<IAdminOrderVO> = await request({
    url: '/admin/order/details/' + id,
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}
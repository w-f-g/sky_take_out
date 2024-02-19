import request from '@/utils/request'
import type { IBusinessDataVO, IOrderOverViewVO, IOverViewVO, IResponse } from '@sky_take_out/types'

/** 查询今日运营数据 */
export const getBusinessData = async () => {
  const res: IResponse<IBusinessDataVO> = await request({
    url: '/admin/workspace/businessData',
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

/** 查询订单管理数据 */
export const getOverviewOrders = async () => {
  const res: IResponse<IOrderOverViewVO> = await request({
    url: '/admin/workspace/overviewOrders',
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

/** 查询菜品总览 */
export const getOverviewDishes = async () => {
  const res: IResponse<IOverViewVO> = await request({
    url: '/admin/workspace/overviewDishes',
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

/** 查询套餐总览 */
export const getOverviewSetmeals = async () => {
  const res: IResponse<IOverViewVO> = await request({
    url: '/admin/workspace/overviewSetmeals',
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}
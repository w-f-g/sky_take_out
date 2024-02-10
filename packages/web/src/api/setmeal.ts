import request from '@/utils/request'
import type { IPageResult, IResponse, ISetmealPageQueryDTO, ISetmealPageVO, ISetmealVO } from '@sky_take_out/types'

export const getSetmealList = async (params: ISetmealPageQueryDTO) => {
  const res: IResponse<IPageResult<ISetmealPageVO>> = await request({
    url: '/admin/setmeal/page',
    params,
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const updateSetmealStatus = async (status: 0 | 1, id: number) => {
  const res: IResponse = await request({
    url: '/admin/setmeal/status/' + status,
    method: 'post',
    params: {
      id,
    },
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const deleteSetmeals = async (ids: string[]) => {
  const res: IResponse = await request({
    url: '/admin/setmeal',
    method: 'delete',
    params: {
      ids,
    },
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const getSetmealInfo = async (id: string) => {
  const res: IResponse<ISetmealVO> = await request({
    url: '/admin/setmeal/' + id,
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}
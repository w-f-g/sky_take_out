import request from '@/utils/request'
import type { IAddDish, IDish, IDishEntity, IDishPageQueryDTO, IDishPageVO, IDishVO, IPageResult, IResponse } from '@sky_take_out/types'

export const getDishList = async (params: IDishPageQueryDTO) => {
  const res: IResponse<IPageResult<IDishPageVO>> = await request({
    url: '/admin/dish/page',
    params,
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const updateDishStatus = async (status: 0 | 1, id: number) => {
  const res: IResponse = await request({
    url: '/admin/dish/status/' + status,
    method: 'post',
    params: {
      id,
    },
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const addDish = async (data: IAddDish) => {
  const res: IResponse = await request({
    url: '/admin/dish',
    method: 'post',
    data,
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const editDish = async (data: IDish) => {
  const res: IResponse = await request({
    url: '/admin/dish',
    method: 'put',
    data,
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const getDishInfo = async (id: string) => {
  const res: IResponse<IDishVO> = await request({
    url: '/admin/dish/' + id,
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const deleteDishs = async (ids: string[]) => {
  const res: IResponse = await request({
    url: '/admin/dish',
    method: 'delete',
    params: {
      ids,
    }
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const getDishListByCategoryId = async (categoryId: number) => {
  const res: IResponse<IDishEntity[]> = await request({
    url: '/admin/dish/list',
    params: {
      categoryId,
    },
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}
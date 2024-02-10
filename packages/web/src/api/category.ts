import request from '@/utils/request'
import type { IAddCategoryDTO, ICategoryPageQueryDTO, ICategoryVO, IEditCategoryDTO, IPageResult, IResponse } from '@sky_take_out/types'

export const getCategoryList = async (params: ICategoryPageQueryDTO) => {
  const res: IResponse<IPageResult<ICategoryVO>> = await request({
    url: '/admin/category/page',
    params,
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const changeCategoryStatus = async (status: 0 | 1, categoryId: number) => {
  const res: IResponse = await request({
    url: '/admin/category/status/' + status,
    method: 'post',
    params: {
      id: categoryId,
    }
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const addCategory = async (data: IAddCategoryDTO) => {
  const res: IResponse = await request({
    url: '/admin/category',
    method: 'post',
    data,
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const editCategory = async (data: IEditCategoryDTO) => {
  const res: IResponse = await request({
    url: '/admin/category',
    method: 'put',
    data,
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const deleteCategory = async (id: number) => {
  const res: IResponse = await request({
    url: '/admin/category',
    method: 'delete',
    params: {
      id,
    },
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const getCategoryByType = async (type: 1 | 2) => {
  const res: IResponse<ICategoryVO[]> = await request({
    url: '/admin/category/list',
    params: {
      type,
    },
  })
  if (res.code === 1) {
    return res.data.map(x => {
      return {
        label: x.name,
        value: x.id,
      }
    })
  }
  throw new Error(res.msg)
}

export type TSelectOptions = Awaited<ReturnType<typeof getCategoryByType>>
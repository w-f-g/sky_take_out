import request from '@/utils/request'
import type { IEmployeeLoginDTO, IEmployeeLoginVO, IPasswordEditDTO, IResponse } from '@sky_take_out/types'

export const login = async (params: IEmployeeLoginDTO) => {
  const res: IResponse<IEmployeeLoginVO> = await request({
    url: '/admin/employee/login',
    data: params,
    method: 'post',
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const logout = async () => {
  await request({
    url: '/admin/employee/logout',
    method: 'post',
  })
}

export const editEmployeePassword = async (params: IPasswordEditDTO) => {
  const res: IResponse = await request({
    url: '/admin/employee/editPassword',
    method: 'put',
    data: params,
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}
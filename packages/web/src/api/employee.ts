import request from '@/utils/request'
import type { IEmployeeLoginDTO, IEmployeeLoginVO, IPasswordEditDTO, IResponse, IPageResult, IEmployeeVO, IEmployeePageQueryDTO, IAddEmployeeDTO, IEmployeeDTO } from '@sky_take_out/types'

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

export const queryEmployeePageList = async (query: IEmployeePageQueryDTO) => {
  const res: IResponse<IPageResult<IEmployeeVO>> = await request({
    url: '/admin/employee/page',
    params: query,
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const addEmployee = async (data: IAddEmployeeDTO) => {
  const res: IResponse = await request({
    url: '/admin/employee',
    method: 'post',
    data,
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const editEmployee = async (data: IEmployeeDTO) => {
  const res: IResponse = await request({
    url: '/admin/employee',
    method: 'put',
    data,
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}

export const getEmployeeInfo = async (id: string) => {
  const res: IResponse<IEmployeeVO> = await request({
    url: '/admin/employee/' + id,
  })
  if (res.code === 1) {
    return res.data
  }
  throw new Error(res.msg)
}

export const setEmployeeStatus = async (status: 0 | 1, id: number) => {
  const res: IResponse = await request({
    url: '/admin/employee/status/' + status,
    method: 'post',
    params: {
      id,
    },
  })
  if (res.code === 0) {
    throw new Error(res.msg)
  }
}
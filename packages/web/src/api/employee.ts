import request from '@/utils/request'
import type { IEmployeeLoginDTO, IEmployeeLoginVO, IResponse } from '@sky_take_out/types'

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

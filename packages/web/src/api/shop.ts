import request from '@/utils/request'
import type { IResponse } from '@sky_take_out/types'

export const getShopStatus = async () => {
  const res: IResponse<number> = await request({
    url: '/admin/shop/status',
  })
  return res.data
}

export const updateShopStatus = async (status: '0' | '1') => {
  await request({
    url: `/admin/shop/${status}`,
    method: 'put',
  })
}
import { login } from '@/api'
import type { IEmployeeLoginDTO, IEmployeeLoginVO } from '@sky_take_out/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<IEmployeeLoginVO | null>(null)
  const setUserInfo = async (params: IEmployeeLoginDTO) => {
      const _userInfo = await login(params)
      userInfo.value = _userInfo
    try {
    } catch (err) {
      console.log(err)
    }
  }

  return {
    userInfo,
    setUserInfo,
  }
})

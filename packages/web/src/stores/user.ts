import { login, logout } from '@/api'
import type { IEmployeeLoginDTO, IEmployeeLoginVO } from '@sky_take_out/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const EMPLOYEE_STORAGE_KEY = 'employee_info'

export const useUserStore = defineStore('user', () => {
  const userInfoStorage = localStorage.getItem(EMPLOYEE_STORAGE_KEY) || '{}'
  const userInfo = ref<IEmployeeLoginVO>(JSON.parse(userInfoStorage))
  const setUserInfo = async (params: IEmployeeLoginDTO) => {
    const _userInfo = await login(params)
    userInfo.value = _userInfo
    localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(_userInfo))
  }

  const employeeLogout = async () => {
    await logout()
    userInfo.value = {} as IEmployeeLoginVO
    localStorage.removeItem(EMPLOYEE_STORAGE_KEY)
  }

  return {
    userInfo,
    setUserInfo,
    employeeLogout,
  }
})

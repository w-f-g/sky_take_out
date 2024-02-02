import { getShopStatus as getShopStatusRequest } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShopStore = defineStore('store', () => {
  const status = ref(false)

  const getShopStatus = async () => {
    const _status = await getShopStatusRequest()
    status.value = _status === 1
  }

  return {
    status,
    getShopStatus,
  }
})
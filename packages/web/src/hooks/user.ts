import { useUserStore } from '@/stores/user'
import { toRefs } from 'vue'

export const useUserInfo = () => {
  const userStore = useUserStore()
  return toRefs(userStore.userInfo)
}
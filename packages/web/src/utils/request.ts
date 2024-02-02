import router from '@/router'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import axios, { AxiosError } from 'axios'
import { toValue } from 'vue'

const request = axios.create({
  baseURL: '/api',
})

request.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const userInfo = toValue(userStore.userInfo)
    if (userInfo) {
      config.headers['token'] = userInfo.token
    }
    return config
  },
  err => Promise.reject(err),
)

request.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  (err: AxiosError) => {
    const { response } = err
    if (response!.status === 401) {
      message.warn('身份过期，请重新登录！')
      router.push('/login')
    }
    return Promise.reject(err)
  },
)

export default request

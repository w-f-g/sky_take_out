import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
})

request.interceptors.request.use(
  config => {
    return config
  },
  err => Promise.reject(err),
)

request.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  err => Promise.reject(err),
)

export default request

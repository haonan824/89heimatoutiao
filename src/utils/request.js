import axios from 'axios'
import router from '../router/index'
import { Message } from 'element-ui'
// 请求拦截
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
// 相应拦截
axios.interceptors.response.use(function (res) {
  return res.data ? res.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  if (status === 400) {
    message = '请求参数错误'
  } else if (status === 403) {
    window.localStorage.removeItem('uesr-token') // 删除命令
    router.push('/login')
  } else if (status === 507) {
    message = '服务器异常'
  } else if (status === 401) {
    window.localStorage.removeItem('uesr-token') // 删除命令
    router.push('/login')
  } else if (status === 404) {
    message = '服务器地址错误'
  }
  Message({ type: 'warning', message })
})
export default axios

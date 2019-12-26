import axios from 'axios'
import router from '../router/index'
import { Message } from 'element-ui'
import JNOSBig from 'json-bigint'
// 请求拦截
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.defaults.transformResponse = [function (data) {
  return data ? JNOSBig.parse(data) : {}
} ]
// 像应拦截
axios.interceptors.response.use(function (res) {
  return res.data ? res.data : {}
}, function (error) {
  // console.log(error.response)
  let state = error.response.status
  let message = ''
  if (state === 400) {
    message = '请求参数错误'
  } else if (state === 403) {
    message = '没有设置权限'
  } else if (state === 507) {
    message = '服务器异常'
  } else if (state === 401) {
    window.localStorage.removeItem('uesr-token') // 删除命令
    router.push('/login')
  } else if (state === 404) {
    message = '服务器地址错误'
  } else {
    message = '未知错误'
  }
  Message({ type: 'warning', message })
  return Promise.reject(error)
})
export default axios

import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authentication'] = getToken()
      // Authorization  Authentication
    }
    // 携带全局参数
    config.headers['Current-Version'] = 'v1.0.0'
    config.headers['Client-Type'] = 'web_store'
    config.headers['Store'] = '1'

    return config
  },
  error => {
    // 请求错误
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log('----------响应拦截器-success----------')
    if (res.code !== 1000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('----------响应拦截器-error----------')
    // 请求超时
    if (error.message.includes('timeout') && error.toString().indexOf('Error: timeout') === 0) {
      Message({
        message: '请求超时，请稍后再试',
        type: 'error',
        duration: 10 * 1000
      })
    } else {
      const { data } = error.response
      Message({
        message: data.message,
        type: 'error',
        duration: 3 * 1000
      })
      // 登录过期
      if (data.code === -1) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
    }
    return Promise.reject(error)
  }
)

export default service

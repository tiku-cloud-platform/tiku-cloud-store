import request from '@/utils/request'

/**
 * 获取七牛云上传凭证
 * @returns {AxiosPromise}
 */
export function qnToken() {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post'
  })
}

import request from '@/utils/request'

export function user(params) {
  return request({
    url: '/dashboard/user',
    method: 'get',
    params
  })
}

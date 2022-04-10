import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/notice/list',
    method: 'get',
    params
  })
}

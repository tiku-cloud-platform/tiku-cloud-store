import request from '@/utils/request'

export function list() {
  return request({
    url: 'store/notice/list',
    method: 'get'
  })
}

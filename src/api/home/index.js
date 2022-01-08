import request from '@/utils/request'

export function home() {
  return request({
    url: 'store/home/index',
    method: 'get'
  })
}


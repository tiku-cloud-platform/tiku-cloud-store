import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/exam/submit/list',
    method: 'get',
    params
  })
}


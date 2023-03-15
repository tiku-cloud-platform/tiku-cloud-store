import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/book/evaluate_history/list',
    method: 'get',
    params
  })
}

export function edit(params) {
  return request({
    url: '/store/book/evaluate_history/update',
    method: 'put',
    data: params
  })
}

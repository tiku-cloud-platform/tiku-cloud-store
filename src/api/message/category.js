import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/message/category/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/message/category/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/message/category/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/message/category/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

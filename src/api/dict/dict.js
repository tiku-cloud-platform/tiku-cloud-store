import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/dict/list',
    method: 'get',
    params
  })
}

export function listGroupCode(params) {
  return request({
    url: '/store/dict/list_group_code',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/dict/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/dict/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/dict/delete',
    method: 'delete',
    data: params
  })
}

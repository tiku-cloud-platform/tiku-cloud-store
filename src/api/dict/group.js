import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/dict/group/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/dict/group/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/dict/group/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/dict/group/delete',
    method: 'delete',
    data: params
  })
}

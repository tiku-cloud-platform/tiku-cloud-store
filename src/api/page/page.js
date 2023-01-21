import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'page/list',
    method: 'get',
    params
  })
}

export function all(params) {
  return request({
    url: 'page/all',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: 'page/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: 'page/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: 'page/delete',
    method: 'delete',
    data: params
  })
}

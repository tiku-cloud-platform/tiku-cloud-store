import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/config/content/list',
    method: 'get',
    params
  })
}

export function show(params) {
  return request({
    url: '/store/config/content/show',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/config/content/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/config/content/update',
    method: 'post',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/config/content/delete',
    method: 'delete',
    data: params
  })
}

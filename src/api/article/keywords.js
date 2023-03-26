import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/article/keywords/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/article/keywords/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/article/keywords/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/article/keywords/delete',
    method: 'delete',
    data: params
  })
}

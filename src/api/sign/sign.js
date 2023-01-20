import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/sign/config/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/sign/config/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/sign/config/update',
    method: 'post',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/sign/config/delete',
    method: 'delete',
    data: params
  })
}

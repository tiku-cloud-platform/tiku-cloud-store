import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/attache/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/attache/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/attache/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/attache/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}


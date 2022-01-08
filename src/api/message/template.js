import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/subscribe/config/list',
    method: 'get',
    params
  })
}

export function show(params) {
  return request({
    url: 'store/subscribe/config/show',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/subscribe/config/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/subscribe/config/update',
    method: 'post',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/subscribe/config/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

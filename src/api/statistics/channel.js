import request from '@/utils/request'

export function show(params) {
  return request({
    url: 'store/channel/show',
    method: 'get',
    params
  })
}

export function list(params) {
  return request({
    url: 'store/channel/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: 'store/channel/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: 'store/channel/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: 'store/channel/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/channel/group/list',
    method: 'get',
    params
  })
}

export function show(params) {
  return request({
    url: '/store/channel/group/show',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/channel/group/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/channel/group/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/channel/group/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

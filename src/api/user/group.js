import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/user/group/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/user/group/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/user/group/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/user/group/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

export function show(params) {
  return request({
    url: 'store/user/group/show',
    method: 'get',
    params
  })
}

import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'user/grade/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/user/grade/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/user/grade/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/user/grade/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}


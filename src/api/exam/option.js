import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/exam/option/list',
    method: 'get',
    params
  })
}

export function parent(params) {
  return request({
    url: 'store/exam/option/parent',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/exam/option/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/exam/option/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/exam/option/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

export function show(params) {
  return request({
    url: 'store/exam/option/show',
    method: 'get',
    params
  })
}

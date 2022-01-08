import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/exam/reading/list',
    method: 'get',
    params
  })
}

export function parent(params) {
  return request({
    url: 'store/exam/reading/parent',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/exam/reading/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/exam/reading/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/exam/reading/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

export function show(params) {
  return request({
    url: 'store/exam/reading/show',
    method: 'get',
    params
  })
}

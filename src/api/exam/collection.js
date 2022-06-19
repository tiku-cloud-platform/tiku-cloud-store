import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/exam/collection/list',
    method: 'get',
    params
  })
}

export function relation(params) {
  return request({
    url: 'store/exam/collection/relation',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/exam/collection/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/exam/collection/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/exam/collection/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

export function show(params) {
  return request({
    url: 'store/exam/collection/show',
    method: 'get',
    params
  })
}

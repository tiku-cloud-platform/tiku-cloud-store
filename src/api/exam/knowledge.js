import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/exam/tag/list',
    method: 'get',
    params
  })
}

export function parent(params) {
  return request({
    url: 'store/exam/tag/parent',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/exam/tag/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/exam/tag/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/exam/tag/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

export function show(params) {
  return request({
    url: 'store/exam/tag/show',
    method: 'get',
    params
  })
}

import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/book_basic/list',
    method: 'get',
    params
  })
}

export function show(params) {
  return request({
    url: '/store/book_basic/show',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/book_basic/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/book_basic/update',
    method: 'post',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/book_basic/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}


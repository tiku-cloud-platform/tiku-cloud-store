import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/book_content/list',
    method: 'get',
    params
  })
}

export function show(params) {
  return request({
    url: '/store/book_content/show',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/book_content/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/book_content/update',
    method: 'post',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/book_content/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}


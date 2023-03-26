import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/book_category/list',
    method: 'get',
    params
  })
}

export function parentAll(params) {
  return request({
    url: '/book_category/parent_all',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/book_category/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/book_category/update',
    method: 'post',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/book_category/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}


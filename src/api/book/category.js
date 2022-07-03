import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/book_cateogry/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/book_cateogry/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/book_cateogry/update',
    method: 'post',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/book_cateogry/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}


import request from '@/utils/request'

export function listAll(params) {
  return request({
    url: 'store/article/category/all',
    method: 'get',
    params
  })
}
export function list(params) {
  return request({
    url: 'store/article/category/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/article/category/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/article/category/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/article/category/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

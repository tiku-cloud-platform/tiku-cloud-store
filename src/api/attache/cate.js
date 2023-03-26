import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/attache_cate/list',
    method: 'get',
    params
  })
}

export function parentAll(params) {
  return request({
    url: '/attache_cate/all',
    method: 'get',
    params
  })
}

export function treeAll(params) {
  return request({
    url: '/attache_cate/tree',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/attache_cate/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/attache_cate/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/attache_cate/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}


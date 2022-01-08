import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/exam/category/list',
    method: 'get',
    params
  })
}

export function parent(params) {
  return request({
    url: 'store/exam/category/parent',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/exam/category/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/exam/category/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/exam/category/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

export function show(params) {
  return request({
    url: 'store/exam/category/show',
    method: 'get',
    params
  })
}

// 二级分类
export function examSecondaryList(params) {
  return request({
    url: 'store/exam/category/second',
    method: 'get',
    params
  })
}
